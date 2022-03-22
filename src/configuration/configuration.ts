import 'dotenv/config';

export interface DatabaseConfigValues {
  main: {
    url: string;
  };
  secondary: {
    url: string;
  };
}
export class Configuration {
  static getDatabaseConfigValues(): DatabaseConfigValues {
    return {
      main: {
        url: process.env.MYSQL_DB_URL,
      },
      secondary: {
        url: process.env.MYSQL_DB_URL,
      },
    };
  }
}
