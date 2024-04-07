import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApolloFederationDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { OrdersResolver } from './orders.resolver';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([Order]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, OrdersResolver],
})
export class OrdersModule { }
