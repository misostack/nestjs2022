import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './configuration/configuration';

@Module({
  imports: [
    // connect database
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: Configuration.getDatabaseConfigValues().main.url,
      entities: [__dirname + '/entity/*{.js,.ts}'],
      // must not be synchronize automaticall, use data migration instea
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {
    console.error('this.connection.isConnected:', this.connection.isConnected);
  }
}
