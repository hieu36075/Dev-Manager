import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigModule } from './infrastructures/typeorm/typeorm.config';
import { RepositoriesModule } from './infrastructures/repositories/repository.module';

import { CreateAccountCommand } from './application/use-case/user/command/create-account.command';
import { CreateAccountHandler } from './application/use-case/user/command/create-account.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './persentation/user/user.controller';

const CommandHandler = [
  CreateAccountCommand,
  CreateAccountHandler
]
@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true
  }),
  CqrsModule,
  TypeOrmConfigModule,
  RepositoriesModule,
  
],
  
  controllers: [
    UserController
  ],
  providers: [
    ...CommandHandler
  ],
})
export class AppModule {}
