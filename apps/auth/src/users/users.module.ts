import { Module } from '@nestjs/common';
import { DatabaseModule, User } from '@app/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PersistenceModule } from '@app/common/persistence/persistence.module';

@Module({
  imports: [
    // DatabaseModule,
    // DatabaseModule.forFeature([User]),
    PersistenceModule.forDatabase({
      models: [User],
      module: 'auth',
    }),
    PersistenceModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule { }
