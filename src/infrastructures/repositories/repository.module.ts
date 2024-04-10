import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from '../entities/position.entity';
import { Project } from '../entities/project.enity';
import { ProjectMember } from '../entities/projectMember.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { PositionRepositoryOrm } from './position/position.repository';
import { ProjectRepositoryOrm } from './project/project.repository';
import { ProjectMemberRepositoryOrm } from './projectMember/projectMember.repository';
import { RoleRepositoryOrm } from './role/role.repository';
import { UserRepositoryOrm } from './user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Project, ProjectMember, Position]),
  ],
  providers: [
    UserRepositoryOrm,
    RoleRepositoryOrm,
    ProjectRepositoryOrm,
    ProjectMemberRepositoryOrm,
    PositionRepositoryOrm,
  ],
  exports: [
    UserRepositoryOrm,
    RoleRepositoryOrm,
    ProjectRepositoryOrm,
    ProjectMemberRepositoryOrm,
  ],
})
export class RepositoriesModule {}
