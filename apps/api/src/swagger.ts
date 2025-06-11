import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalErrorMessages } from './common/errors/global-error-messages.enum';

export const swagger = async (app: NestExpressApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Flemme api')
    .addBearerAuth()
    .addGlobalResponse({
      status: 500,
      description: GlobalErrorMessages.INTERNAL_SERVER_ERROR,
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);
};
