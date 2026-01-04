/**
 * Main Routes
 * Mounts all API route modules
 */

import express from 'express';
import lootSplitRoutes from './loot-split.routes.js';
import soloHuntRoutes from './solo-hunt.routes.js';

const router = express.Router();

// Mount loot split routes at /api/loot-split
router.use('/loot-split', lootSplitRoutes);

// Mount solo hunt routes at /api/solo-hunt
router.use('/solo-hunt', soloHuntRoutes);

// Health check endpoint (optional)
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Site da Luci API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;