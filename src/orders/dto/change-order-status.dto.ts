import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/order-status.enum';

export class ChangeOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
