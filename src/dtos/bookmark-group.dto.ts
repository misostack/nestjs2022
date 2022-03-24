import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class BookmarkGroupCreateDTO {
  @ApiProperty({
    example: 'Technical',
    description: `The bookmark group\'s name`,
  })
  @IsNotEmpty()
  title: string;
}
