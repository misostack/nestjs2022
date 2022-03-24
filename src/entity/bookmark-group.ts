import { AbstractEntity } from '../shared/AbstractEntity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Bookmark } from './bookmark';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BookmarkGroup extends AbstractEntity {
  @ApiProperty({
    example: '1',
    description: `The bookmark group\'s id`,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Technical',
    description: `The bookmark group\'s name`,
  })
  @Column({ nullable: false })
  title: string;

  @ApiProperty()
  @Column({
    nullable: true,
    default: 0,
  })
  totalBookmarks: number;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.bookMarkGroup)
  bookmarks: Bookmark[];
}
