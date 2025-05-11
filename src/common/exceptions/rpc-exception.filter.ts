import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcError } from './rpc-error';
import { EmptyResponseException } from '@nestjs/microservices/errors/empty-response.exception';

@Catch(RpcException, EmptyResponseException)
export class MicrosrvExceptionFilter implements ExceptionFilter {
  catch(
    exception: RpcException | EmptyResponseException,
    host: ArgumentsHost,
  ): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof EmptyResponseException) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message.substring(
          0,
          exception.message.indexOf('(') - 1,
        ),
      });
      return;
    }

    const error = exception.getError() as RpcError;

    if ('status' in error && 'message' in error) {
      response
        .status(
          typeof error.status === 'string'
            ? HttpStatus.BAD_REQUEST
            : error.status,
        )
        .json(error);
    } else {
      response.status(HttpStatus.BAD_GATEWAY).json({
        status: HttpStatus.BAD_GATEWAY,
        message: 'Bad Gateway',
      });
    }
  }
}
