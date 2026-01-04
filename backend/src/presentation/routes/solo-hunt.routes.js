/**
 * Solo Hunt Routes
 * Defines endpoints for solo hunt calculator
 */

import express from 'express';
import SoloHuntController from '../controllers/SoloHuntController.js';

// Import use cases for dependency injection
import CalculateSoloHuntUseCase from '../../application/use-cases/solo-hunt/CalculateSoloHuntUseCase.js';

const router = express.Router();

// Dependency Injection setup
const calculateSoloHuntUseCase = new CalculateSoloHuntUseCase();
const soloHuntController = new SoloHuntController(calculateSoloHuntUseCase);

/**
 * POST /calculate
 * Calculate solo hunt results with custom item costs
 *
 * Request body: {
 *   parsedSession: { sessionInfo, duration, player: { name, loot, supplies, balance, damage, healing } },
 *   customItems: [{ name, quantity, unitPrice, priceType, itemDuration }],
 *   goldTokenPrice: number,
 *   silverTokenPrice: number,
 *   tibiaCoinPrice: number
 * }
 * Response: { success: true, data: { session, costs, totalSupplies, adjustedBalance, profitPerHour, ... } }
 */
router.post('/calculate', (req, res, next) => soloHuntController.calculate(req, res, next));

export default router;
