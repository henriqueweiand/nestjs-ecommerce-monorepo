import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
