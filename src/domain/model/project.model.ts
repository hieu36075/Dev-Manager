import { ProjectStatusEnum } from '@/application/common/enums/project-status.enum';
import { ProjectMemberM } from './projectMember.model';
import { UserM } from './user.model';

export class ProjectM {
  id:string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectMembers: ProjectMemberM[];
  status: ProjectStatusEnum;
  technical: string[];
  manager:UserM
  managerId: string
}
