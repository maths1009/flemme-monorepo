import { ApiException as SwaggerApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { ExceptionOrExceptionArrayFunc } from '@nanogiants/nestjs-swagger-api-exception-decorator/dist/lib/interfaces/api-exception.interface';
import { applyDecorators, HttpException } from '@nestjs/common';

/**
 * Décorateur pour documenter les réponses d'erreur spécifiques de l'API
 * À utiliser explicitement dans les contrôleurs qui ont besoin de documenter
 * des exceptions spécifiques comme NotFound, BadRequest, etc.
 *
 * @param exceptions Liste des exceptions à documenter avec leurs options
 * @returns Décorateur composé pour la documentation Swagger des exceptions
 */
export function ApiException<T extends HttpException>(
  exception:
    | ExceptionOrExceptionArrayFunc<T>[]
    | ExceptionOrExceptionArrayFunc<T>,
) {
  const exceptions = Array.isArray(exception) ? exception : [exception];
  return applyDecorators(...exceptions.map((ex) => SwaggerApiException(ex)));
}
