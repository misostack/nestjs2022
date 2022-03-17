import { AppService } from './app.service';
import Container from './container';

import { CronJob } from 'cron';

export const ScheduleA = new CronJob(
  '* * * * * *',
  function () {
    console.log('running a task every second');
    const appService = Container.getAppInstance().get(AppService);
    console.error('NODE CRON: ' + appService.getHello());
  },
  null,
  true,
  'Asia/Ho_Chi_Minh',
);
