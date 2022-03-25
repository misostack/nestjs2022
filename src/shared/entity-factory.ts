import { ID } from 'src/contracts/scaffolding';
import { getRepository } from 'typeorm';
import { ResponseFactory } from './response-factory';

export class EntityFactory {
  static async findEntity<T>(entityClass: any, id: ID) {
    const entity = await getRepository(entityClass).findOne(id);
    if (!entity) {
      ResponseFactory.notFound(
        `${entityClass.name} with id=${id} is not found`,
      );
    }
    return entity as T;
  }
}
