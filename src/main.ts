import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import Environment from './environment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // STATIC ASSETS
  console.error(__dirname);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // VIEW ENGINES
  app.setViewEngine('ejs');
  app.setBaseViewsDir(
    join(__dirname, '..', 'public', 'themes', Environment.getTheme()),
  );

  await app.listen(Environment.getPort());
}
bootstrap();
