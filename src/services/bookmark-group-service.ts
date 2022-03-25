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
  BookmarkGroupCreateBatchDTO,
  BookmarkGroupCreateDTO,
  BookmarkGroupUpdateBatchDTO,
  BookmarkGroupUpdateBatchResponse,
  BookmarkGroupUpdateDTO,
} from 'src/dtos/bookmark-group.dto';

// global
@Injectable()
export class BookmarkGroupService
  implements
    BaseService<
      BookmarkGroup,
      BookmarkGroupCreateDTO,
      BookmarkGroupCreateBatchDTO,
      BookmarkGroupUpdateDTO,
      BookmarkGroupUpdateBatchDTO
    >
{
  constructor(
    @InjectRepository(BookmarkGroup)
    private bookmarkGroupRepository: Repository<BookmarkGroup>,
  ) {}

  create(payload: BookmarkGroupCreateDTO): Promise<BookmarkGroup> {
    return this.bookmarkGroupRepository.save(payload);
  }
  createEach(payload: BookmarkGroupCreateBatchDTO): Promise<BookmarkGroup[]> {
    const { items } = payload;
    return this.bookmarkGroupRepository.save(items);
  }
  updateOne(id: ID, payload: BookmarkGroupUpdateDTO): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.bookmarkGroupRepository.update(id, payload).then(
        () => {
          resolve(true);
        },
        (error) => reject(error),
      );
    });
  }
  async updateEach(
    payload: BookmarkGroupUpdateBatchDTO,
  ): Promise<BookmarkGroupUpdateBatchResponse> {
    const items = [];
    for (const item of payload.items) {
      const { id, ...data } = item;
      const updateStatus = {};
      try {
        await this.bookmarkGroupRepository.update(id, data);
        updateStatus[id] = true;
      } catch (error) {
        updateStatus[id] = false;
      }
      items.push(updateStatus);
    }
    return { items };
  }
  destroyOne(id: ID): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.bookmarkGroupRepository.delete(id).then(
        () => resolve(true),
        (error) => reject(error),
      );
    });
  }
  find(options: ScaffoldingFindOptions): Promise<BookmarkGroup[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: ID): Promise<BookmarkGroup> {
    return this.bookmarkGroupRepository.findOne(id);
  }
}
