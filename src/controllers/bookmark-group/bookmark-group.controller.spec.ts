import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkGroupController } from './bookmark-group.controller';

describe('BookmarkGroupController', () => {
  let controller: BookmarkGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarkGroupController],
    }).compile();

    controller = module.get<BookmarkGroupController>(BookmarkGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
