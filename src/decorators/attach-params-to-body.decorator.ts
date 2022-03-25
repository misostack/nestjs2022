import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type ConvertType = 'int' | 'float' | 'string';

const parseValue = (value: any, type: ConvertType) => {
  switch (type) {
    case 'int':
      return parseInt(value);
    case 'float':
      return parseFloat(value);
    case 'string':
      return `${value}`;
    default:
      return value;
  }
};

export const AttachParamsToBodyDecorator = createParamDecorator(
  (args: Array<{ name: string; type: ConvertType }>, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    args.map((p) => {
      const { name, type } = p;
      if (req.params[name]) {
        req.body[name] = parseValue(req.params[name], type);
      }
    });
    return req.body;
  },
);
