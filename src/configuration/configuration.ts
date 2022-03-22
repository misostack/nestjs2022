import 'dotenv/config';

export class Configuration {
  static getMainDatabaseConfiguration(dirname): any {
    return {
      type: 'mysql',
      url: process.env.MYSQL_DB_URL,
      entities: [dirname + '/entity/*{.js,.ts}'],
      // must not be synchronize automaticall, use data migration instea
      synchronize: false,
      // migrations
      migrations: [dirname + '/database/migrations/*.ts'],
      cli: {
        migrationsDir: dirname + '/database/migrations',
      },
      // clis
    };
  }
}
