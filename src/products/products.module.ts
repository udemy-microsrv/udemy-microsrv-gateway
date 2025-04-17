import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { MICROSRV_PRODUCT } from 'src/config/microservices.token';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MICROSRV_PRODUCT,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('microsrv.product.host'),
            port: configService.get('microsrv.product.port'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
