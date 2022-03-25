import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Equal, getRepository, Not } from 'typeorm';

@ValidatorConstraint({ async: true, name: 'IsUnique' })
export class EntityExistsConstraint implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    const [entity] = validationArguments.constraints;
    return `${entity.name} ${validationArguments.property} is duplicated`;
  }

  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const [entity] = validationArguments.constraints;
    const object = validationArguments.object as any;
    const property = validationArguments.property;
    const criteria = {};
    criteria[`${property}`] = Equal(value);
    if (object) {
      criteria['id'] = Not(object?.id);
    }
    // findOne with LIMIT 1 perfect for query optimization
    return getRepository(entity)
      .findOne({
        where: criteria,
      })
      .then((v) => {
        return !v;
      });
  }
}

export const IsUnique = (
  entity: any,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: EntityExistsConstraint,
      // async: true,
      // validator: {
      //   async validate(value: any, args: ValidationArguments) {
      //     const criteria = {};
      //     criteria[`${propertyName}`] = value;
      //     // basic way
      //     return getRepository(params.entity)
      //       .count(criteria)
      //       .then((v) => {
      //         return v == 0;
      //       });
      //   },
      // },
    });
  };
};
