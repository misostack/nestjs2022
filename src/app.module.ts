import { Module } from '@nestjs/common';
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

console.error(Configuration.getMainDatabaseConfiguration(__dirname));

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
export class AppModule {
  constructor(private connection: Connection) {
    console.error('this.connection.isConnected:', this.connection.isConnected);
    // test collection
  }
}
