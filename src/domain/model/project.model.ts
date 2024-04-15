import { ProjectStatusEnum } from '@/application/common/enums/project-status.enum';
import { ProjectMemberM } from './projectMember.model';

import { User } from '@/infrastructures/entities/user.entity';
import { UserM } from './user.model';
import { LanguageMemberM } from './languageMember.modal';
import { LanguageProjectM } from './languageProject.modal';
import { TechnicalProjectM } from './technicalProject.model';

export class ProjectM {
  id:string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectMembers: ProjectMemberM[];
  languageProject: LanguageProjectM[];
  technicalProject: TechnicalProjectM[];
  status: ProjectStatusEnum;
  user: UserM;
}
