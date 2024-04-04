import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@app/common';

@Entity()
export class Order extends AbstractEntity<Order> {
    @Column()
    userId: string;

    @Column()
    price: number;
}
