import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BookmarkGroupBatchDTO,
  BookmarkGroupCreateDTO,
} from 'src/dtos/bookmark-group.dto';
import { BookmarkGroup } from 'src/entity/bookmark-group';

import { BookmarkGroupService } from 'src/services/bookmark-group-service';
import { ResponseFactory } from 'src/shared/response-factory';

@ApiTags('bookmarks')
@Controller('bookmark-groups')
export class BookmarkGroupController {
  constructor(private bookmarkGroupService: BookmarkGroupService) {}
  @Post()
  @ApiOperation({ summary: 'Create bookmark group' })
  @ApiResponse(ResponseFactory.badRequestResponseFormat())
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'The new record',
    type: BookmarkGroup,
  })
  create(@Body() payload: BookmarkGroupCreateDTO): Promise<BookmarkGroup> {
    return this.bookmarkGroupService.create(payload);
  }
  @Patch()
  @ApiOperation({ summary: 'Create batch of bookmark groups' })
  @ApiResponse(ResponseFactory.badRequestResponseBatchFormat())
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    type: BookmarkGroup,
    isArray: true,
  })
  createBatch(
    @Body() payload: BookmarkGroupBatchDTO,
  ): Promise<Array<BookmarkGroup>> {
    return this.bookmarkGroupService.createEach(payload);
  }
}
