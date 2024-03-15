import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadGatewayException,
  PreconditionFailedException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core/helpers/';
import { Request, Response } from 'express';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: Error, host: ArgumentsHost): void {
    // const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof PreconditionFailedException) {
      const status = exception.getStatus();
      const errorField = exception.getResponse()['path'];
      const message = errorField + ': ' + exception.message;
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
      });
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
    } else if (exception instanceof BadGatewayException) {
      response.status(500).json({
        statusCode: 500,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
    }

    // httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
