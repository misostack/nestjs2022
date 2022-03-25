import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BookmarkGroupCreateBatchDTO,
  BookmarkGroupCreateDTO,
  BookmarkGroupUpdateBatchDTO,
  BookmarkGroupUpdateBatchResponse,
  BookmarkGroupUpdateDTO,
} from 'src/dtos/bookmark-group.dto';
import { BookmarkGroup } from 'src/entity/bookmark-group';

import { BookmarkGroupService } from 'src/services/bookmark-group-service';

@ApiTags('bookmarks')
@Controller('bookmark-groups')
export class BookmarkGroupController {
  constructor(private bookmarkGroupService: BookmarkGroupService) {}
  /**
   * Create bookmark Action
   *
   * @param {BookmarkGroupCreateDTO} payload
   * @returns {Promise<BookmarkGroup>}
   * @memberof BookmarkGroupController
   */
  @Post()
  create(@Body() payload: BookmarkGroupCreateDTO): Promise<BookmarkGroup> {
    return this.bookmarkGroupService.create(payload);
  }

  @Patch(':id')
  updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body()
    payload: BookmarkGroupUpdateDTO,
  ): Promise<BookmarkGroup> {
    return this.bookmarkGroupService.updateOne(id, payload);
  }

  @Post('/batch')
  createBatch(
    @Body() payload: BookmarkGroupCreateBatchDTO,
  ): Promise<Array<BookmarkGroup>> {
    return this.bookmarkGroupService.createEach(payload);
  }
  @Patch('/batch')
  updateBatch(
    @Body() payload: BookmarkGroupUpdateBatchDTO,
  ): Promise<BookmarkGroupUpdateBatchResponse> {
    return this.bookmarkGroupService.updateEach(payload);
  }
}
