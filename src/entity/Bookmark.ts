import { AbstractEntity } from '../shared/AbstractEntity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { BookmarkGroup } from './bookmark-group';

@Entity()
export class Bookmark extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  link: string;

  @ManyToOne(() => BookmarkGroup, (bookmarkGroup) => bookmarkGroup.bookmarks)
  bookMarkGroup: BookmarkGroup;
}
