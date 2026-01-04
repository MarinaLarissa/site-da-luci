/**
 * Solo Hunt Controller
 * Handles HTTP requests for solo hunt calculations
 */

class SoloHuntController {
  constructor(calculateSoloHuntUseCase) {
    this.calculateSoloHuntUseCase = calculateSoloHuntUseCase;
  }

  /**
   * POST /calculate
   * Calculate solo hunt results with custom item costs
   */
  async calculate(req, res, next) {
    try {
      const {
        parsedSession,
        customItems,
        goldTokenPrice,
        silverTokenPrice,
        tibiaCoinPrice,
      } = req.body;

      // Validate required fields
      if (!parsedSession) {
        return res.status(400).json({
          success: false,
          error: 'Missing required field: parsedSession',
        });
      }

      if (!Array.isArray(customItems)) {
        return res.status(400).json({
          success: false,
          error: 'customItems must be an array',
        });
      }

      // Execute use case
      const results = this.calculateSoloHuntUseCase.execute({
        parsedSession,
        customItems: customItems || [],
        goldTokenPrice: goldTokenPrice || 0,
        silverTokenPrice: silverTokenPrice || 0,
        tibiaCoinPrice: tibiaCoinPrice || 0,
      });

      // Return results
      return res.status(200).json({
        success: true,
        data: results,
      });
    } catch (error) {
      // Handle validation errors
      if (error.message.includes('required') || error.message.includes('must be')) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }

      // Pass unexpected errors to error handler middleware
      next(error);
    }
  }
}

export default SoloHuntController;
