import { BookmarkGroup } from '../entity/bookmark-group';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// global
@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(BookmarkGroup)
    private bookmarkGroupRepository: Repository<BookmarkGroup>,
  ) {}

  findAllBookmarkGroups(): Promise<BookmarkGroup[]> {
    return this.bookmarkGroupRepository.find();
  }
}
