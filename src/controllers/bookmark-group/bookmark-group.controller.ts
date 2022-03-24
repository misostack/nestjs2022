import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookmarkGroupCreateDTO } from 'src/dtos/bookmark-group.dto';
import { BookmarkGroup } from 'src/entity/bookmark-group';

import { BookmarkGroupService } from 'src/services/bookmark-group-service';

@ApiTags('bookmarks')
@Controller('bookmark-groups')
export class BookmarkGroupController {
  constructor(private bookmarkGroupService: BookmarkGroupService) {}
  @Post()
  @ApiOperation({ summary: 'Create bookmark group' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'The new record',
    type: BookmarkGroup,
  })
  create(@Body() payload: BookmarkGroupCreateDTO): Promise<BookmarkGroup> {
    return this.bookmarkGroupService.create<BookmarkGroupCreateDTO>(payload);
  }
}
