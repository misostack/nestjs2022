import {
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class BadRequestResponse {
  @ApiProperty()
  statusCode: HttpStatus;
  @ApiProperty({
    example: {
      statusCode: 400,
      errors: [
        {
          title: {
            code: 'IsUnique',
            message: 'BookmarkGroup title is duplicated',
          },
        },
      ],
      message: 'Bad request',
    },
  })
  errors: Array<{ [field: string]: any }>;
  @ApiProperty()
  message: string;
}

class BadRequestResponseBatch {
  @ApiProperty()
  statusCode: HttpStatus;
  @ApiProperty({
    example: {
      statusCode: 400,
      errors: [
        {
          items: [
            {
              index: '0',
              errors: [
                {
                  title: {
                    code: 'IsUnique',
                    message: 'BookmarkGroup title is duplicated',
                  },
                },
              ],
            },
          ],
        },
      ],
      message: 'Bad request',
    },
  })
  errors: Array<{ [field: string]: any }>;
  @ApiProperty()
  message: string;
}

export class ResponseFactory {
  static badRequest(errors: Array<any>) {
    throw new BadRequestException({
      message: 'BAD_REQUEST',
      errors,
      code: 'HttpStatus.BAD_REQUEST',
    });
  }
  static notFound(message: string = 'NOT_FOUND') {
    throw new NotFoundException({
      message,
      code: 'HttpStatus.NOT_FOUND',
    });
  }
}
