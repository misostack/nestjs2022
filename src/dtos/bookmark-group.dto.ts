import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
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

export class BookmarkGroupBatchDTO {
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
