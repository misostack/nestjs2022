import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { BookmarkGroup, BookmarkGroupStatus } from 'src/entity/BookmarkGroup';
import { IsUnique } from 'src/shared/validators';
export class BookmarkGroupCreateDTO {
  @ApiProperty({
    example: 'Technical',
    description: `The bookmark group\'s name`,
  })
  @IsNotEmpty()
  title: string;
}

export class BookmarkGroupUpdateBatchItemDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'Technical',
    description: `The bookmark group\'s name`,
  })
  @IsUnique(BookmarkGroup)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: BookmarkGroupStatus.ACTIVE,
    description: `The bookmark group\'s status`,
  })
  @IsEnum(BookmarkGroupStatus)
  status: BookmarkGroupStatus;
}

export class BookmarkGroupCreateBatchDTO {
  @ApiProperty({
    example: [{ title: 'Technical' }, { title: 'Marketing' }],
    description: 'Create list of bookmarks',
  })
  @ValidateNested({ each: true })
  @Type(() => BookmarkGroupCreateDTO)
  @ArrayNotEmpty()
  @IsArray()
  items: BookmarkGroupCreateDTO[];
}

export class BookmarkGroupUpdateDTO extends PartialType(
  BookmarkGroupCreateDTO,
) {
  @ApiProperty({
    example: BookmarkGroupStatus.ACTIVE,
    description: `The bookmark group\'s status`,
  })
  @IsEnum(BookmarkGroupStatus)
  status: BookmarkGroupStatus;
}

export class BookmarkGroupUpdateBatchDTO {
  @ApiProperty({
    example: [
      { id: 1, title: 'Technical', status: true },
      { id: 2, title: 'Marketing', status: false },
    ],
    description: 'Update list of bookmarks',
  })
  @ValidateNested({ each: true })
  @Type(() => BookmarkGroupUpdateBatchItemDTO)
  @ArrayNotEmpty()
  @IsArray()
  items: BookmarkGroupUpdateBatchItemDTO[];
}

export class BookmarkGroupUpdateBatchResponse {
  @ApiProperty({
    example: [
      { id: 1, success: true },
      { id: 2, success: true },
    ],
    description: 'Update list of bookmarks status',
  })
  items: Array<{ id: boolean }>;
}
