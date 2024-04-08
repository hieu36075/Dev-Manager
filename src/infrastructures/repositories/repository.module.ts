import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { TypeOrmConfigModule } from '../typeorm/typeorm.config';
import { UserRepositoryOrm } from './user.repository';

@Module({
  imports: [ TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryOrm],
  exports: [UserRepositoryOrm],
})
export class RepositoriesModule {}