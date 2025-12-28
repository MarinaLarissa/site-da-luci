/**
 * Loot Split Routes
 * Defines endpoints for loot split calculator
 */

import express from 'express';
import LootSplitController from '../controllers/LootSplitController.js';
import { validateLootSplitRequest } from '../middlewares/validator.js';

// Import use cases for dependency injection
import ParseLootSessionUseCase from '../../application/use-cases/loot-split/ParseLootSessionUseCase.js';
import CalculateLootSplitUseCase from '../../application/use-cases/loot-split/CalculateLootSplitUseCase.js';
import TibiaLootParser from '../../infrastructure/parsers/TibiaLootParser.js';

const router = express.Router();

// Dependency Injection setup
const tibiaLootParser = new TibiaLootParser();
const calculateLootSplitUseCase = new CalculateLootSplitUseCase();
const parseLootSessionUseCase = new ParseLootSessionUseCase(
  tibiaLootParser,
  calculateLootSplitUseCase
);
const lootSplitController = new LootSplitController(parseLootSessionUseCase);

/**
 * POST /calculate
 * Calculate loot split from raw TIBIA text
 *
 * Request body: { rawText: string }
 * Response: { success: true, data: { summary, players, transfers, copyableText } }
 */
router.post(
  '/calculate',
  validateLootSplitRequest,
  (req, res, next) => lootSplitController.calculate(req, res, next)
);

export default router;