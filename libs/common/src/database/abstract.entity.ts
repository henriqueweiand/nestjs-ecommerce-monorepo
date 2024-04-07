import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ isAbstract: true })
export class AbstractEntity<T> {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
