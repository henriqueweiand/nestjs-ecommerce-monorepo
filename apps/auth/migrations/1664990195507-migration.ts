import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1664990195507 implements MigrationInterface {
  name = 'migration1664990195507';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('migration1664990195507 up');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('migration1664990195507 down');
  }
}
