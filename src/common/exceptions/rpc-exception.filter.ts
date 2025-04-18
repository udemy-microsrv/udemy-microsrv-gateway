import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcError } from './rpc-error';

@Catch(RpcException)
export class MicrosrvExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
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
