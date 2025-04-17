import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post()
  create() {
    return 'create';
  }

  @Get()
  findAll() {
    return 'findAll';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `findOne (${id})`;
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
