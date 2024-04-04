import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class OrdersRepository extends AbstractRepository<Order> {
    protected readonly logger = new Logger(OrdersRepository.name);

    constructor(
        @InjectRepository(Order)
        itemsRepository: Repository<Order>,
        entityManager: EntityManager,
    ) {
        super(itemsRepository, entityManager);
    }
}
