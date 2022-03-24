import { BookmarkGroup } from '../entity/bookmark-group';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BaseService,
  ID,
  ScaffoldingFindOptions,
} from 'src/contracts/scaffolding';
import {
  BookmarkGroupBatchDTO,
  BookmarkGroupCreateDTO,
} from 'src/dtos/bookmark-group.dto';

// global
@Injectable()
export class BookmarkGroupService
  implements
    BaseService<BookmarkGroup, BookmarkGroupCreateDTO, BookmarkGroupBatchDTO>
{
  constructor(
    @InjectRepository(BookmarkGroup)
    private bookmarkGroupRepository: Repository<BookmarkGroup>,
  ) {}
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
  create(payload: BookmarkGroupCreateDTO): Promise<BookmarkGroup> {
    return this.bookmarkGroupRepository.save(payload);
  }
  createEach(payload: BookmarkGroupBatchDTO): Promise<BookmarkGroup[]> {
    const { items } = payload;
    return this.bookmarkGroupRepository.save(items);
  }
}
