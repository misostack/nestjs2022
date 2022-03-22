import { Controller, Get, Render } from '@nestjs/common';

import { BookmarkService } from './services/bookmark-service';

@Controller()
export class AppController {
  constructor(private bookmarkService: BookmarkService) {
    // test collection
    this.bookmarkService.findAllBookmarkGroups().then((groups) => {
      console.error(groups.map((g) => `${g.id} : ${g.title}`));
    });
  }

  @Get('')
  @Render('index')
  index() {
    this.bookmarkService.findAllBookmarkGroups().then((groups) => {
      console.error(groups.map((g) => `${g.id} : ${g.title}`));
    });
    return { hello: 'this.appService.getHello()' };
  }
}
