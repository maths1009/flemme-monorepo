import { AppModule } from '@/app.module';
import { bootstrap } from '@/bootstrap';
import { ValidationFilter } from '@/common/filters/validation.filter';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

const main = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalFilters(new ValidationFilter());
  await bootstrap(app);
};

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
