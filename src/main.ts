import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import Environment from './environment';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from './pipes';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  // STATIC ASSETS
  console.error(__dirname);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // VIEW ENGINES
  app.setViewEngine('ejs');
  app.setBaseViewsDir(
    join(__dirname, '..', 'public', 'themes', Environment.getTheme()),
  );

  // API DOCs
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('JSGURU NestJS')
      .setDescription('The JSUGRU API description')
      .setVersion('1.0')
      .addTag('bookmarks')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('explorer', app, document);
  }

  // DATA VALIDATIONS
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: false,
    }),
  );

  await app.listen(Environment.getPort());
}
bootstrap();
