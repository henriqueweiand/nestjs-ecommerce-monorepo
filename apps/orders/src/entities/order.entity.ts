import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Order extends AbstractEntity<Order> {
    @Field()
    @Column()
    userId: string;

    @Field()
    @Column()
    price: number;
}
