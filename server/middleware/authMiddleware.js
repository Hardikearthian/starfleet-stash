import {
  clerkMiddleware,
  getAuth,
} from '@clerk/express';

export const clerkAuthMiddleware = clerkMiddleware();

/**
 * Allows only authenticated users to continue.
 *
 * @param {Object} request - Express request.
 * @param {Object} response - Express response.
 * @param {Function} next - Moves request to the next middleware.
 * @returns {void}
 */
export function requireAuthentication(
  request,
  response,
  next,
) {
  const { isAuthenticated } = getAuth(request);

  if (!isAuthenticated) {
    response.status(401).json({
      success: false,
      message: 'Authentication required',
    });

    return;
  }

  next();
}