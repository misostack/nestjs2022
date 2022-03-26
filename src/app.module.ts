import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { Configuration } from './configuration/configuration';
import { Bookmark } from './entity/bookmark';
import { BookmarkGroup } from './entity/bookmark-group';
import { BookmarkGroupService } from './services/bookmark-group-service';
import { BookmarkController } from './controllers/bookmark/bookmark.controller';
import { BookmarkGroupController } from './controllers/bookmark-group/bookmark-group.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { JsonBodyMiddleware } from './middlewares/json-body.middleware';
import { MultipartBodyMiddleware } from './middlewares/multipart-body.middleware';
import { RouteInfo } from '@nestjs/common/interfaces';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require('multer');

const MultipartBodyParsingRoutes: Array<RouteInfo> = [
  {
    path: '/examples/upload-file',
    method: RequestMethod.POST,
  },
];

@Module({
  imports: [
    // connect database
    TypeOrmModule.forRoot({
      ...Configuration.getMainDatabaseConfiguration(__dirname),
      autoLoadEntities: true,
      // logging: true,
      logging: ['query', 'error'],
    }),
    // registered entities
    TypeOrmModule.forFeature([Bookmark, BookmarkGroup]),
  ],
  controllers: [AppController, BookmarkController, BookmarkGroupController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    BookmarkGroupService,
  ],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {
    console.error('this.connection.isConnected:', this.connection.isConnected);
    // test collection
  }
  public configure(consumer: MiddlewareConsumer) {
    const upload = multer({
      dest: './public/data/uploads/',
    });
    // default is JSON
    consumer
      .apply(upload.single('file'))
      .forRoutes(...MultipartBodyParsingRoutes)
      .apply(JsonBodyMiddleware)
      .exclude(...MultipartBodyParsingRoutes)
      .forRoutes('*');
  }
}
