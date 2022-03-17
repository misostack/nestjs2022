import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import Container from './container';
import { ScheduleA } from './cron';
import Environment from './environment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  Container.setAppInstance(app.select(AppModule));
  // STATIC ASSETS
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // VIEW ENGINES
  app.setViewEngine('ejs');
  app.setBaseViewsDir(
    join(__dirname, '..', 'public', 'themes', Environment.getTheme()),
  );

  await app.listen(Environment.getPort()).then(() => {
    // start cron
    ScheduleA.start();
  });
}
bootstrap();
