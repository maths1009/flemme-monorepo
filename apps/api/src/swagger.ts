import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { GlobalErrorMessages } from './common/errors/global-error-messages.enum';
import { Env } from './common/utils';

export const swagger = async (app: NestExpressApplication) => {
  const configService = app.get(ConfigService<Env>);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Flemme api')
    .addBearerAuth()
    .addGlobalResponse({
      status: 500,
      description: GlobalErrorMessages.INTERNAL_SERVER_ERROR,
    })
    .addServer(
      `${configService.get('HOST')}:${configService.get('PORT')}/api/v1`,
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  fs.writeFileSync('swagger-spec.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('api-docs', app, document);
};
