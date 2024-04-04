import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class OrderDocument extends AbstractDocument {
    @Prop()
    price: number;
}

export const OrderSchema =
    SchemaFactory.createForClass(OrderDocument);
