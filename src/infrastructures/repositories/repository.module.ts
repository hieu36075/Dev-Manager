import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { TypeOrmConfigModule } from '../typeorm/typeorm.config';
import { UserRepositoryOrm } from './user/user.repository';
import { Role } from '../entities/role.entity';
import { RoleRepositoryOrm } from './role/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User,Role])],
  providers: [
    UserRepositoryOrm,
    RoleRepositoryOrm
  ],
  exports: [
    UserRepositoryOrm, 
    RoleRepositoryOrm
  ],
})
export class RepositoriesModule {}