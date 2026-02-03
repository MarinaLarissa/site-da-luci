-- Migration: Bestiary Planner Sync Tables
-- Created: 2026-02-03
-- Description: Tables for syncing Bestiary Planner data across devices

-- =====================================================
-- 1. BESTIARY CHARACTERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.bestiary_characters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    level INTEGER NOT NULL CHECK (level >= 1 AND level <= 2000),
    vocation VARCHAR(20) NOT NULL CHECK (vocation IN ('knight', 'paladin', 'sorcerer', 'druid')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Indexes for performance
    CONSTRAINT bestiary_characters_user_id_name_key UNIQUE (user_id, name)
);

CREATE INDEX idx_bestiary_characters_user_id ON public.bestiary_characters(user_id);
CREATE INDEX idx_bestiary_characters_updated_at ON public.bestiary_characters(updated_at);

-- =====================================================
-- 2. BESTIARY PROGRESS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.bestiary_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    character_id UUID NOT NULL REFERENCES public.bestiary_characters(id) ON DELETE CASCADE,
    creature_id VARCHAR(100) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- One progress entry per character-creature pair
    CONSTRAINT bestiary_progress_character_creature_key UNIQUE (character_id, creature_id)
);

CREATE INDEX idx_bestiary_progress_character_id ON public.bestiary_progress(character_id);
CREATE INDEX idx_bestiary_progress_completed ON public.bestiary_progress(completed);
CREATE INDEX idx_bestiary_progress_updated_at ON public.bestiary_progress(updated_at);

-- =====================================================
-- 3. BESTIARY SETTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.bestiary_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    rapid_respawn_active BOOLEAN NOT NULL DEFAULT false,
    preferred_regions JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- One settings entry per user
    CONSTRAINT bestiary_settings_user_id_key UNIQUE (user_id)
);

CREATE INDEX idx_bestiary_settings_user_id ON public.bestiary_settings(user_id);

-- =====================================================
-- 4. TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for bestiary_characters
DROP TRIGGER IF EXISTS update_bestiary_characters_updated_at ON public.bestiary_characters;
CREATE TRIGGER update_bestiary_characters_updated_at
    BEFORE UPDATE ON public.bestiary_characters
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for bestiary_progress
DROP TRIGGER IF EXISTS update_bestiary_progress_updated_at ON public.bestiary_progress;
CREATE TRIGGER update_bestiary_progress_updated_at
    BEFORE UPDATE ON public.bestiary_progress
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for bestiary_settings
DROP TRIGGER IF EXISTS update_bestiary_settings_updated_at ON public.bestiary_settings;
CREATE TRIGGER update_bestiary_settings_updated_at
    BEFORE UPDATE ON public.bestiary_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.bestiary_characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bestiary_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bestiary_settings ENABLE ROW LEVEL SECURITY;

-- ========== BESTIARY CHARACTERS POLICIES ==========

-- Policy: Users can view their own characters
DROP POLICY IF EXISTS "Users can view their own characters" ON public.bestiary_characters;
CREATE POLICY "Users can view their own characters"
    ON public.bestiary_characters
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Users can insert their own characters
DROP POLICY IF EXISTS "Users can insert their own characters" ON public.bestiary_characters;
CREATE POLICY "Users can insert their own characters"
    ON public.bestiary_characters
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own characters
DROP POLICY IF EXISTS "Users can update their own characters" ON public.bestiary_characters;
CREATE POLICY "Users can update their own characters"
    ON public.bestiary_characters
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own characters
DROP POLICY IF EXISTS "Users can delete their own characters" ON public.bestiary_characters;
CREATE POLICY "Users can delete their own characters"
    ON public.bestiary_characters
    FOR DELETE
    USING (auth.uid() = user_id);

-- ========== BESTIARY PROGRESS POLICIES ==========

-- Policy: Users can view progress for their own characters
DROP POLICY IF EXISTS "Users can view their own progress" ON public.bestiary_progress;
CREATE POLICY "Users can view their own progress"
    ON public.bestiary_progress
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.bestiary_characters
            WHERE id = bestiary_progress.character_id
            AND user_id = auth.uid()
        )
    );

-- Policy: Users can insert progress for their own characters
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.bestiary_progress;
CREATE POLICY "Users can insert their own progress"
    ON public.bestiary_progress
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.bestiary_characters
            WHERE id = bestiary_progress.character_id
            AND user_id = auth.uid()
        )
    );

-- Policy: Users can update progress for their own characters
DROP POLICY IF EXISTS "Users can update their own progress" ON public.bestiary_progress;
CREATE POLICY "Users can update their own progress"
    ON public.bestiary_progress
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.bestiary_characters
            WHERE id = bestiary_progress.character_id
            AND user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.bestiary_characters
            WHERE id = bestiary_progress.character_id
            AND user_id = auth.uid()
        )
    );

-- Policy: Users can delete progress for their own characters
DROP POLICY IF EXISTS "Users can delete their own progress" ON public.bestiary_progress;
CREATE POLICY "Users can delete their own progress"
    ON public.bestiary_progress
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.bestiary_characters
            WHERE id = bestiary_progress.character_id
            AND user_id = auth.uid()
        )
    );

-- ========== BESTIARY SETTINGS POLICIES ==========

-- Policy: Users can view their own settings
DROP POLICY IF EXISTS "Users can view their own settings" ON public.bestiary_settings;
CREATE POLICY "Users can view their own settings"
    ON public.bestiary_settings
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Users can insert their own settings
DROP POLICY IF EXISTS "Users can insert their own settings" ON public.bestiary_settings;
CREATE POLICY "Users can insert their own settings"
    ON public.bestiary_settings
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own settings
DROP POLICY IF EXISTS "Users can update their own settings" ON public.bestiary_settings;
CREATE POLICY "Users can update their own settings"
    ON public.bestiary_settings
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own settings
DROP POLICY IF EXISTS "Users can delete their own settings" ON public.bestiary_settings;
CREATE POLICY "Users can delete their own settings"
    ON public.bestiary_settings
    FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- 6. HELPER FUNCTIONS
-- =====================================================

-- Function: Get character with progress count
CREATE OR REPLACE FUNCTION public.get_character_with_progress(character_uuid UUID)
RETURNS TABLE (
    id UUID,
    user_id UUID,
    name VARCHAR,
    level INTEGER,
    vocation VARCHAR,
    total_completed BIGINT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.id,
        c.user_id,
        c.name,
        c.level,
        c.vocation,
        COUNT(p.id) FILTER (WHERE p.completed = true) as total_completed,
        c.created_at,
        c.updated_at
    FROM public.bestiary_characters c
    LEFT JOIN public.bestiary_progress p ON p.character_id = c.id
    WHERE c.id = character_uuid
    GROUP BY c.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- Tables created: bestiary_characters, bestiary_progress, bestiary_settings
-- RLS policies: Enabled and configured for all tables
-- Triggers: Auto-update updated_at timestamps
-- Indexes: Created for performance optimization
