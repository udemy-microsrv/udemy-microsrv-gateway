import { PaginationDto } from '../../common/pagination/pagination.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../enum/order-status.enum';

export class PaginationAndFilterDto extends PaginationDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
