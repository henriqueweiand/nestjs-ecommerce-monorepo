import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { OrderDocument } from './entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersRepository extends AbstractRepository<OrderDocument> {
    protected readonly logger = new Logger(OrdersRepository.name);

    constructor(
        @InjectModel(OrderDocument.name)
        reservationModel: Model<OrderDocument>,
    ) {
        super(reservationModel);
    }
}
