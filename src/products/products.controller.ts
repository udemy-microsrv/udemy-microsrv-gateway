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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { MICROSRV_PRODUCT } from 'src/config/microservices.token';

@Controller('products')
export class ProductsController {
  constructor(@Inject(MICROSRV_PRODUCT) private productClient: ClientProxy) {}

  @Post()
  create() {
    return 'create';
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productClient.send({ cmd: 'product.find_all' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productClient.send({ cmd: 'product.find_one' }, { id });
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    return `update (${id})`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return `remove (${id})`;
  }
}
