import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const isProduction = process.env.NODE_ENV === 'production';
    if (!(exception instanceof HttpException)) {
      console.error(exception);
      return httpAdapter.reply(
        ctx.getResponse(),
        {
          message: isProduction
            ? 'INTERNAL_SERVER_ERROR'
            : (exception as Error).message + (exception as Error).stack,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const statusCode = (exception as HttpException).getStatus();
      const res = (exception as HttpException).getResponse() as {
        message: string;
        code: string;
        errors?: Array<any>;
      };
      return httpAdapter.reply(
        ctx.getResponse(),
        {
          message: res.message,
          code: (res.code ||= res.message),
          statusCode: statusCode,
          errors: (res.errors ||= null),
        },
        statusCode,
      );
    } catch (error) {
      console.error(exception);
      return httpAdapter.reply(
        ctx.getResponse(),
        {
          message: isProduction
            ? 'INTERNAL_SERVER_ERROR'
            : (exception as Error).message + (exception as Error).stack,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
