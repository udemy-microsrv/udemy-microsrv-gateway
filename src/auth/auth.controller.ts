import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/microservices.token';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { catchError } from 'rxjs';
import { RpcError } from 'src/common/exceptions/rpc-error';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private clientProxy: ClientProxy) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.clientProxy.send('auth.register_user', registerUserDto).pipe(
      catchError((err: RpcError) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.clientProxy.send('auth.login_user', loginUserDto).pipe(
      catchError((err: RpcError) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get('verify-token')
  verifyToken() {
    return this.clientProxy.send('auth.verify_token', {});
  }
}
