import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

/**
 * Decorator to automatically add Swagger documentation for JWT protected endpoints
 * Adds:
 * - ApiBearerAuth to indicate that the endpoint requires a Bearer token
 * - ApiUnauthorizedResponse to document the response in case of authentication failure
 * - ApiResponse to document the 403 response in case of forbidden access
 *
 * @returns Composed decorator for Swagger documentation of JWT endpoints
 */
export function ApiJwtResponse() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Invalid authentication or expired JWT token',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: 'Unauthorized' },
        },
      },
    }),
  );
}
