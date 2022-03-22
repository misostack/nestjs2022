import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { Configuration } from './configuration/configuration';
import { Bookmark } from './entity/bookmark';
import { BookmarkGroup } from './entity/bookmark-group';
import { BookmarkService } from './services/bookmark-service';

console.error(Configuration.getMainDatabaseConfiguration(__dirname));

@Module({
  imports: [
    // connect database
    TypeOrmModule.forRoot({
      ...Configuration.getMainDatabaseConfiguration(__dirname),
      autoLoadEntities: true,
    }),
    // registered entities
    TypeOrmModule.forFeature([Bookmark, BookmarkGroup]),
  ],
  controllers: [AppController],
  providers: [BookmarkService],
})
export class AppModule {
  constructor(private connection: Connection) {
    console.error('this.connection.isConnected:', this.connection.isConnected);
    // test collection
  }
}
