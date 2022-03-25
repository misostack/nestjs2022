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
    throw new BadRequestException({ errors });
  }
  static notFound(message: string) {
    throw new NotFoundException(message);
  }
}
