import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Render,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';

import { BookmarkGroupService } from './services/bookmark-group-service';

@Controller('examples')
export class AppController {
  constructor(private bookmarkGroupService: BookmarkGroupService) {}

  @Render('index')
  index() {
    return { hello: 'this.appService.getHello()' };
  }

  @Get('route-params/:param1?/:param2?')
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'size',
    type: 'number',
    required: false,
  })
  routeParams(
    @Param() params,
    @Query('filter') filter,
    @Query('sort') sort,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ) {
    const lastItem = page * size;
    return { params, filter, sort, page, size, lastItem };
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload-file')
  uploadFile(@Req() req: Request) {
    console.error(req.body, req.file);
    return {
      body: req.body,
      file: req.file,
    };
  }
  // @UseInterceptors(FileInterceptor('file'))
  // @Post('upload-file')
  // uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
  //   console.log(req.body);
  //   return true;
  // }
}
