import 'dotenv/config';

class Environment {
  public static getPort(): number {
    return parseInt(process.env.PORT || '3000');
  }
  public static getTheme(): string {
    return process.env.THEME || 'default';
  }
}

export default Environment;
