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
import { Technical } from '../entities/technical.entity';
import { TechnicalRepositoryOrm } from './technical/technical.repository';
import { ProfileRepositoryOrm } from './profile/profile.repository';
import { Profile } from '../entities/profile.entity';
import { TechnicalMemberRepositoryOrm } from './technicalMember/technicalMember.repository';
import { TechnicalMember } from '../entities/technicalMember.entity';
import { Language } from '../entities/language.entity';
import { LanguageRepositoryOrm } from './language/language.repository';
import { LanguageProjectRepositoryOrm } from './languageProject/languageProject.repository';
import { LanguageProject } from '../entities/languageProject.entity';
import { TechnicalProjectRepositoryOrm } from './technicalProject/technicalProject.repository';
import { TechnicalProject } from '../entities/technicalProject.enity';


@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    Role,
    Project,
    ProjectMember,
    Position,
    Technical,
    Profile,
    TechnicalMember,
    Language,
    LanguageProject,
    TechnicalProject
  ])],

  providers: [
    UserRepositoryOrm,
    RoleRepositoryOrm,
    ProjectRepositoryOrm,
    ProjectMemberRepositoryOrm,
    PositionRepositoryOrm,
    TechnicalRepositoryOrm,
    ProfileRepositoryOrm,
    TechnicalMemberRepositoryOrm,
    LanguageRepositoryOrm,
    LanguageProjectRepositoryOrm,
    TechnicalProjectRepositoryOrm
  ],
  
  exports: [
    UserRepositoryOrm,
    RoleRepositoryOrm,
    ProjectRepositoryOrm,
    ProjectMemberRepositoryOrm,
    PositionRepositoryOrm,
    TechnicalRepositoryOrm,
    ProfileRepositoryOrm,
    TechnicalMemberRepositoryOrm,
    LanguageRepositoryOrm,
    LanguageProjectRepositoryOrm,
    TechnicalProjectRepositoryOrm,
  ],
})
export class RepositoriesModule { }