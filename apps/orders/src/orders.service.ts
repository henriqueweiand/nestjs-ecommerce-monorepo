import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';
import { UserDto } from '@app/common/dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
  ) {
  }

  create(createOrderDto: CreateOrderDto, user: UserDto) {
    const order = new Order({
      ...createOrderDto,
      userId: user.id,
    });

    return this.ordersRepository.create(order);
  }

  findAll() {
    return this.ordersRepository.find({});
  }

  findOne(id: string) {
    return this.ordersRepository.findOne({ id });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.ordersRepository.findOneAndUpdate({ id }, updateOrderDto);
  }

  remove(id: string) {
    return this.ordersRepository.findOneAndDelete({ id });
  }
}
