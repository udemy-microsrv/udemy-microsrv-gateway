import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSRV_ORDER } from '../config/microservices.token';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(MICROSRV_ORDER) private orderClient: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send('order.create', createOrderDto);
  }

  @Get()
  findAll() {
    return 'findAll';
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return `findOne (${id})`;
  }

  @Patch(':id')
  changeStatus(@Param('id', ParseUUIDPipe) id: string) {
    return `changeStatus (${id})`;
  }
}
