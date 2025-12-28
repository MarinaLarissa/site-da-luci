/**
 * Request validation middleware using express-validator
 */

import { body, validationResult } from 'express-validator';

/**
 * Validation rules for POST /api/loot-split/calculate
 *
 * Rules:
 * - rawText: required, must be string, min length 10 characters
 */
export const validateLootSplitRequest = [
  body('rawText')
    .exists().withMessage('rawText is required')
    .isString().withMessage('rawText must be a string')
    .notEmpty().withMessage('rawText cannot be empty')
    .isLength({ min: 10 }).withMessage('rawText must be at least 10 characters long'),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Format validation errors into consistent error response
      const errorMessages = errors.array().map((err) => err.msg);

      return res.status(400).json({
        success: false,
        error: {
          message: errorMessages.join(', '),
          code: 'VALIDATION_ERROR',
          details: errors.array(),
        },
      });
    }

    next();
  },
];