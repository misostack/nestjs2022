import { Controller, Get, Render } from '@nestjs/common';

import { BookmarkGroupService } from './services/bookmark-group-service';

@Controller()
export class AppController {
  constructor(private bookmarkGroupService: BookmarkGroupService) {}

  @Get('')
  @Render('index')
  index() {
    return { hello: 'this.appService.getHello()' };
  }
}
