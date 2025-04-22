import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { MICROSRV_ORDER } from '../config/microservices.token';
import { CreateOrderDto } from './dto/create-order.dto';
import { catchError } from 'rxjs';
import { RpcError } from '../common/exceptions/rpc-error';
import { PaginationAndFilterDto } from './dto/pagination-and-filter.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(MICROSRV_ORDER) private orderClient: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send('order.create', createOrderDto);
  }

  @Get()
  findAll(@Query() paginationAndFilterDto: PaginationAndFilterDto) {
    return this.orderClient.send('order.find_all', paginationAndFilterDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderClient.send('order.find_one', { id }).pipe(
      catchError((err: RpcError) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
  ) {
    return this.orderClient
      .send('order.change_status', {
        id,
        ...changeOrderStatusDto,
      })
      .pipe(
        catchError((err: RpcError) => {
          throw new RpcException(err);
        }),
      );
  }
}
