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
import { Bookmark } from './entity/Bookmark';
import { BookmarkGroup } from './entity/BookmarkGroup';
import { BookmarkGroupService } from './services/bookmark-group-service';
import { BookmarkController } from './controllers/bookmark/bookmark.controller';
import { BookmarkGroupController } from './controllers/bookmark-group/bookmark-group.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { JsonBodyMiddleware } from './middlewares/json-body.middleware';
import { SingleFileMiddleware } from './middlewares/multipart-body.middleware';
import { RouteInfo } from '@nestjs/common/interfaces';
import {
  ExampleMiddleware,
  helloMiddleware,
} from './middlewares/example.middleware';

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
    // default is JSON
    consumer
      .apply(helloMiddleware, ExampleMiddleware)
      .forRoutes('/examples/middlewares')
      // single file upload
      .apply(SingleFileMiddleware('file'))
      .forRoutes(...MultipartBodyParsingRoutes)
      .apply(JsonBodyMiddleware)
      .exclude(...MultipartBodyParsingRoutes)
      .forRoutes('*');
  }
}
