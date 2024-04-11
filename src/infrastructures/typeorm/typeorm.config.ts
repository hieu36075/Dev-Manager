/* eslint-disable prettier/prettier */
import { TransactionInterceptor } from '@/application/common/types/transaction.interceptor';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        entities: [join(__dirname, '../entities/*{.ts,.js}')],

        synchronize: true,
        ssl:false
      }),
      inject: [ConfigService],
    }),
  ],
  providers:[
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionInterceptor,
    },
  ]
})
export class TypeOrmConfigModule {}

