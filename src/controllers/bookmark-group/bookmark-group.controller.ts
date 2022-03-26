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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import {
  BookmarkGroupCreateBatchDTO,
  BookmarkGroupCreateDTO,
  BookmarkGroupUpdateBatchDTO,
  BookmarkGroupUpdateBatchResponse,
  BookmarkGroupUpdateDTO,
} from 'src/dtos/bookmark-group.dto';
import { BookmarkGroup } from 'src/entity/bookmark-group';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

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

  @Auth('sadmin', 'member')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<BookmarkGroup> {
    return this.bookmarkGroupService.findOne(id);
  }
}
