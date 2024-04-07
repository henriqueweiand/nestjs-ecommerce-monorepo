import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../database';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User extends AbstractEntity<User> {
  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;
}
