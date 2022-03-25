import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { BookmarkGroup } from 'src/entity/bookmark-group';
import { IsUnique } from 'src/shared/validators';
export class BookmarkGroupCreateDTO {
  @ApiProperty({
    example: 'Technical',
    description: `The bookmark group\'s name`,
  })
  @IsUnique(BookmarkGroup)
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
) {}

export class BookmarkGroupUpdateBatchDTO {
  @ApiProperty({
    example: [
      { id: 1, title: 'Technical' },
      { id: 2, title: 'Marketing' },
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
      { id: 1, status: true },
      { id: 2, status: true },
    ],
    description: 'Update list of bookmarks status',
  })
  items: Array<{ id: boolean }>;
}
