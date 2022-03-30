import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Bookmark } from './Bookmark';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/shared/abstract-entity';

export enum BookmarkGroupStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

@Entity()
export class BookmarkGroup extends AbstractEntity {
  @ApiProperty({
    required: false,
    example: '1',
    description: `The bookmark group\'s id`,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    required: true,
    example: 'Technical',
    description: `The bookmark group\'s name`,
  })
  @Column({ nullable: false, length: 75 })
  title: string;

  @ApiProperty({
    required: false,
    default: BookmarkGroupStatus.ACTIVE,
  })
  @Column({
    type: 'enum',
    enum: BookmarkGroupStatus,
    nullable: true,
    default: BookmarkGroupStatus.ACTIVE,
  })
  status: BookmarkGroupStatus;

  @ApiProperty({
    required: false,
    default: 0,
    description: 'total of bookmarks belongs to this group',
  })
  @Column({
    nullable: true,
    default: 0,
  })
  totalBookmarks: number;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.bookMarkGroup)
  bookmarks: Bookmark[];
}
