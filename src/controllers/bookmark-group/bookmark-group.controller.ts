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
import { ResponseFactory } from 'src/shared/response-factory';

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
  @ApiOperation({ summary: 'Create bookmark group' })
  @ApiResponse(ResponseFactory.badRequestResponseFormat())
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new record',
    type: BookmarkGroup,
  })
  create(@Body() payload: BookmarkGroupCreateDTO): Promise<BookmarkGroup> {
    return this.bookmarkGroupService.create(payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update bookmark group' })
  @ApiResponse(ResponseFactory.badRequestResponseFormat())
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    description: 'Update success',
    type: BookmarkGroup,
  })
  updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body()
    payload: BookmarkGroupUpdateDTO,
  ): Promise<BookmarkGroup> {
    return this.bookmarkGroupService.updateOne(id, payload);
  }

  @Post('/batch')
  @ApiOperation({ summary: 'Create batch of bookmark groups' })
  @ApiResponse(ResponseFactory.badRequestResponseBatchFormat())
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    type: BookmarkGroup,
    isArray: true,
  })
  createBatch(
    @Body() payload: BookmarkGroupCreateBatchDTO,
  ): Promise<Array<BookmarkGroup>> {
    return this.bookmarkGroupService.createEach(payload);
  }
  @Patch('/batch')
  @ApiOperation({ summary: 'Update batch of bookmark groups' })
  @ApiResponse(ResponseFactory.badRequestResponseBatchFormat())
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    type: BookmarkGroupUpdateBatchResponse,
  })
  updateBatch(
    @Body() payload: BookmarkGroupUpdateBatchDTO,
  ): Promise<BookmarkGroupUpdateBatchResponse> {
    return this.bookmarkGroupService.updateEach(payload);
  }
}
