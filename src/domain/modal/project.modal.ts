// project.modal.ts


import { ProjectStatusEnum } from '@/application/common/enums/project-status.enum';
import { ProjectMemberM } from './projectMember.modal';

export class Project {
    id:string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectMembers: ProjectMemberM[];
  status: ProjectStatusEnum;
  technical: string[];
}
