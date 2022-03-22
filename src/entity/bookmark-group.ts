import { AbstractEntity } from '../shared/AbstractEntity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Bookmark } from './bookmark';

@Entity()
export class BookmarkGroup extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.bookMarkGroup)
  bookmarks: Bookmark[];
}
