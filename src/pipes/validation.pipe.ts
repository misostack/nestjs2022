import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidatorOptions } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ResponseFactory } from 'src/shared/response-factory';

const marshalValidationError = (errorConstraints) => {
  const errorKeys = Object.keys(errorConstraints);
  const errroMessages = Object.values(errorConstraints);

  return {
    code: errorKeys[0],
    message: errroMessages[0],
  };
};

const marshalValidationErrors = (errors) => {
  return errors.map((prop) => {
    const newErrorObject = {};
    if (prop.constraints) {
      newErrorObject[prop.property] = marshalValidationError(prop.constraints);
    }
    if (prop.children.length > 0) {
      newErrorObject[prop.property] = [];
      for (let i = 0; i < prop.children.length; i++) {
        const childrenErrors = {
          index: prop.children[i].property,
          errors: marshalValidationErrors(prop.children[i].children),
        };
        newErrorObject[prop.property].push(childrenErrors);
      }
    }
    return newErrorObject;
  });
};

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  _validatiorOptions: ValidatorOptions;
  constructor(validatorOptions: Partial<ValidatorOptions>) {
    this._validatiorOptions = {
      ...validatorOptions,
    };
  }
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    // Pass `skipMissingProperties` as part of the custom validation
    const errors = await validate(object, this._validatiorOptions);
    if (errors.length > 0) {
      ResponseFactory.badRequest(marshalValidationErrors(errors));
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
