/**
 * Global error handler middleware
 * Must be registered LAST in Express middleware chain
 */

/**
 * Error handler middleware
 * Catches all errors thrown in routes/controllers and formats them consistently
 *
 * @param {Error} err - Error object
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Next middleware function
 */
export function errorHandler(err, req, res, next) {
  // Log error for debugging (with stack trace in development)
  if (process.env.NODE_ENV !== 'production') {
    console.error('[ERROR]', err);
  } else {
    console.error('[ERROR]', err.message);
  }

  // Handle known error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        message: err.message,
        code: 'VALIDATION_ERROR',
      },
    });
  }

  if (err.name === 'ParserError' || err.message.includes('parse') || err.message.includes('Invalid')) {
    return res.status(400).json({
      success: false,
      error: {
        message: err.message || 'Invalid loot data format',
        code: 'PARSER_ERROR',
      },
    });
  }

  // Handle unknown errors (500 Internal Server Error)
  res.status(500).json({
    success: false,
    error: {
      message: process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : err.message,
      code: 'INTERNAL_SERVER_ERROR',
    },
  });
}