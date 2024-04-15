import { ProjectStatusEnum } from '@/application/common/enums/project-status.enum';
import { ProjectMemberM } from './projectMember.model';

import { User } from '@/infrastructures/entities/user.entity';
import { UserM } from './user.model';
import { LanguageMemberM } from './languageMember.modal';
import { LanguageProjectM } from './languageProject.modal';

export class ProjectM {
  id:string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  language: string[];
  projectMembers: ProjectMemberM[];
  languageProject: LanguageProjectM[];
  status: ProjectStatusEnum;
  technical: string[];
  user: UserM;
}
