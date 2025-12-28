/**
 * Loot Split Controller - Presentation Layer
 * Handles HTTP requests for loot split calculations
 * Follows Clean Architecture: thin controller, business logic delegated to use cases
 */

import { formatResponse } from '../utils/formatters.js';

export default class LootSplitController {
  /**
   * Constructor with dependency injection
   * @param {ParseLootSessionUseCase} parseLootSessionUseCase - Injected use case
   */
  constructor(parseLootSessionUseCase) {
    if (!parseLootSessionUseCase) {
      throw new Error('ParseLootSessionUseCase is required');
    }
    this.parseLootSessionUseCase = parseLootSessionUseCase;
  }

  /**
   * Calculate loot split from raw TIBIA text
   * POST /api/loot-split/calculate
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   */
  async calculate(req, res, next) {
    try {
      // Extract rawText from request body (already validated by middleware)
      const { rawText } = req.body;

      // Delegate business logic to use case
      const result = await this.parseLootSessionUseCase.execute(rawText);

      // Extract entities from use case result (session, not lootSession)
      const { session, transfers } = result;

      // Format response using presentation layer utility
      const formattedData = formatResponse(session, transfers);

      // Return success response
      return res.status(200).json({
        success: true,
        data: formattedData,
      });
    } catch (error) {
      // Pass error to error handler middleware
      next(error);
    }
  }
}