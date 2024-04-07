import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUser, UserDto } from '@app/common';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) { }

  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput')
    createOrderInput: CreateOrderDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.ordersService.create(createOrderInput, user);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => String }) id: string) {
    return this.ordersService.remove(id);
  }
}
