import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Inject,
  Query,
  Body,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { NATS_SERVICE } from 'src/config/microservices.token';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RpcError } from 'src/common/exceptions/rpc-error';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private clientProxy: ClientProxy) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.clientProxy.send('products.create', createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientProxy.send('products.find_all', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxy.send('products.find_one', { id }).pipe(
      catchError((err: RpcError) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.clientProxy
      .send('products.update', { id, ...updateProductDto })
      .pipe(
        catchError((err: RpcError) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxy.send('products.delete', { id }).pipe(
      catchError((err: RpcError) => {
        throw new RpcException(err);
      }),
    );
  }
}
