import { INestApplicationContext } from '@nestjs/common';

export default class Container {
  public static appInstance: INestApplicationContext = null;
  public static setAppInstance(appInstance: INestApplicationContext) {
    Container.appInstance = appInstance;
  }
  public static getAppInstance(): INestApplicationContext {
    return Container.appInstance;
  }
}
