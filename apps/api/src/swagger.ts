import * as fs from 'node:fs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalErrorMessages } from './common/errors/global-error-messages.enum';

export const swagger = async (app: NestExpressApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Flemme api')
    .addBearerAuth()
    .addGlobalResponse({
      description: GlobalErrorMessages.INTERNAL_SERVER_ERROR,
      status: 500,
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  fs.writeFileSync('swagger-spec.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('api-docs', app, document);
};
