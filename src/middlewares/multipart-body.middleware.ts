/* eslint-disable @typescript-eslint/no-var-requires */

import * as multer from 'multer';

// https://github.com/expressjs/multer/blob/master/doc/README-vi.md

const upload = multer({
  dest: './public/data/uploads/',
});

export function SingleFileMiddleware(fieldName: string): any {
  return upload.single(fieldName);
}

export function MultipleFileMiddleware(fieldName: string, maxCount: number) {
  return upload.array(fieldName, maxCount);
}
