import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { BookmarkGroupService } from 'src/services/bookmark-group-service';
import { ResponseFactory } from 'src/shared/response-factory';
import { getRepository } from 'typeorm';

@Injectable()
export class EntityPipe<T> implements PipeTransform {
  constructor(private entity: any) {}
  async transform(id: number, metadata: ArgumentMetadata): Promise<T> {
    console.log('value', id);
    const record = await getRepository(this.entity).findOne(id);
    if (!record) {
      ResponseFactory.notFound();
    }
    return record as any as T;
  }
}
