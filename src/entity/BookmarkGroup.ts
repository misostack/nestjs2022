import { AbstractEntity } from 'src/shared/abstract-entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bookmark } from './Bookmark';

@Entity()
export class BookmarkGroup extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.bookMarkGroup)
  bookmarks: Bookmark[];
}
