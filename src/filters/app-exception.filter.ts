import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadGatewayException,
  PreconditionFailedException,
  BadRequestException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core/helpers/';
import { Request, Response } from 'express';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(httpStatus).json({
      status: false,
      error: {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      },
    });
  }
}
