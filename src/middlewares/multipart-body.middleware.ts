/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { urlencoded } from 'body-parser';

@Injectable()
export class MultipartBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => any) {
    next();
  }
}
