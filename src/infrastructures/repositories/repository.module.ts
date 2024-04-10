import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { TypeOrmConfigModule } from '../typeorm/typeorm.config';
import { UserRepositoryOrm } from './user/user.repository';
import { Role } from '../entities/role.entity';
import { RoleRepositoryOrm } from './role/role.repository';
import { ProjectRepositoryOrm } from './project/project.repository';
import { Project } from '../entities/project.enity';
import { ProjectM } from '@/domain/model/project.model';
import { ProjectMemberRepositoryOrm } from './projectMember/projectMember.repository';
import { ProjectMemberM } from '@/domain/model/projectMember.model';
import { ProjectMember } from '../entities/projectMember.entity';
import { PositionRepositoryOrm } from './position/position.repository';
import { Position } from '../entities/position.entity';
import { Skill } from '../entities/skill.entity';
import { SkillRepositoryOrm } from './skill/skill.repository';
import { ProfileRepositoryOrm } from './profile/profile.repository';
import { Profile } from '../entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Role,Project, ProjectMember,Position, Skill, Profile])],
  providers: [
    UserRepositoryOrm,
    RoleRepositoryOrm,
    ProjectRepositoryOrm,
    ProjectMemberRepositoryOrm,
    PositionRepositoryOrm,
    SkillRepositoryOrm,
    ProfileRepositoryOrm
  
  ],
  exports: [
    UserRepositoryOrm, 
    RoleRepositoryOrm,
    ProjectRepositoryOrm,
    ProjectMemberRepositoryOrm,
    PositionRepositoryOrm,
    SkillRepositoryOrm,
    ProfileRepositoryOrm
  ],
})
export class RepositoriesModule {}