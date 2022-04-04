import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import {
  BookmarkGroupCreateBatchDTO,
  BookmarkGroupCreateDTO,
  BookmarkGroupUpdateBatchDTO,
  BookmarkGroupUpdateBatchResponse,
  BookmarkGroupUpdateDTO,
} from 'src/dtos/bookmark-group.dto';
import { BookmarkGroup } from 'src/entity/BookmarkGroup';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { EntityPipe } from 'src/pipes';

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
  @ApiParam({
    type: 'number',
    name: 'id',
  })
  @Auth('admin', 'member')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe(),
      new EntityPipe<BookmarkGroup>(BookmarkGroup),
    )
    entity: BookmarkGroup,
  ): Promise<BookmarkGroup> {
    // do check something here if needed
    return entity;
  }
}
