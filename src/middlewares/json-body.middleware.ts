import { Injectable, NestMiddleware } from '@nestjs/common';
import { json } from 'body-parser';

@Injectable()
export class JsonBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => any) {
    console.error('Content TYPE', req.headers['content-type']);
    json()(req as any, res as any, next);
  }
}
