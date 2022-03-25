import {
  Controller,
  Get,
  InternalServerErrorException,
  Render,
} from '@nestjs/common';

import { BookmarkGroupService } from './services/bookmark-group-service';

@Controller()
export class AppController {
  constructor(private bookmarkGroupService: BookmarkGroupService) {}

  @Get('')
  @Render('index')
  index() {
    throw new InternalServerErrorException('interal server error');
    return { hello: 'this.appService.getHello()' };
  }
}
