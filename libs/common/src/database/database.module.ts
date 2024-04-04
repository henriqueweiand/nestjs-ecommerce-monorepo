import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        database: configService.getOrThrow('DATABASE_NAME'),
        username: configService.getOrThrow('DATABASE_USER'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
        // entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        // migrations: [`${__dirname}/migrations/*{.ts,.js}`],
        // cli: {
        //   migrationsDir: 'src/migrations',
        // },
        // migrationsRun: true,
        logging: configService.getOrThrow('TYPEORM_LOGGING'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(models);
  }
}
