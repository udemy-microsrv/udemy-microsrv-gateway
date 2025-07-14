import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const AuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.token) {
      throw new InternalServerErrorException(
        'Auth token does not exist. AuthGuard must be called',
      );
    }

    return request.token;
  },
);
