import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

interface DatabaseOptions {
    module: 'auth' | 'orders'
    models: EntityClassOrSchema[]
}

@Module({})
export class PersistenceModule {
    static forFeature(models: EntityClassOrSchema[]) {
        return TypeOrmModule.forFeature(models);
    }

    static forDatabase({ models, module }: DatabaseOptions): DynamicModule {
        console.log(`${__dirname}/migrations/*{.ts,.js}`)
        return {
            module: PersistenceModule,
            exports: [PersistenceModule],
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
                        entities: models,
                        migrationsRun: true,
                        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
                        cli: {
                            migrationsDir: `${__dirname}/migrations`,
                        },
                        logging: configService.getOrThrow('TYPEORM_LOGGING'),
                    }),
                    inject: [ConfigService],
                }),
            ],
        }
    }
}
