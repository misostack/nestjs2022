import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class ExampleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    console.error(
      '[Example Middleware]',
      'You can check or attach data in request',
    );
    req['EXAMPLE'] = true;
    next();
  }
}

export function helloMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(
    '[Example Middleware]',
    'You can check or attach data in request',
  );
  req['HELLO'] = true;
  next();
}
