import { BookmarkGroup } from '../entity/bookmark-group';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BaseService,
  ID,
  ScaffoldingFindOptions,
} from 'src/contracts/scaffolding';
import { instanceToPlain } from 'class-transformer';

// global
@Injectable()
export class BookmarkGroupService implements BaseService<BookmarkGroup> {
  constructor(
    @InjectRepository(BookmarkGroup)
    private bookmarkGroupRepository: Repository<BookmarkGroup>,
  ) {}
  createEach(payload: Partial<BookmarkGroup>[]): Promise<BookmarkGroup[]> {
    throw new Error('Method not implemented.');
  }
  find(options: ScaffoldingFindOptions): Promise<BookmarkGroup[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: ID): Promise<BookmarkGroup> {
    throw new Error('Method not implemented.');
  }
  updateOne(
    criteria: { id: ID },
    payload: Partial<BookmarkGroup>,
  ): Promise<BookmarkGroup> {
    throw new Error('Method not implemented.');
  }
  destroyOne(criteria: { id: ID }) {
    throw new Error('Method not implemented.');
  }
  create<T>(payload: T): Promise<BookmarkGroup> {
    const entity = this.bookmarkGroupRepository.create({
      ...instanceToPlain(payload),
    });
    return this.bookmarkGroupRepository.save(entity);
  }
}
