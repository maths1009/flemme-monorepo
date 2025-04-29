import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

export function ApiValidationResponse() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Invalid input data',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: {
            type: 'array',
            items: { type: 'string' },
            example: ['email must be a valid email address'],
          },
          error: { type: 'string', example: 'Bad Request' },
        },
      },
    }),
  );
}
