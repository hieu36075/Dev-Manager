
import { PositionEnum } from '@/application/common/enums/position.enum';
import { ProjectM } from './project.model';
import { UserM } from './user.model';
import { PositionM } from './position.model';
import { RoleMemberProjectM } from './roleMemberProject.model';

export class ProjectMemberM {
  id: string;
  project: ProjectM;
  user: UserM;
  roles: RoleMemberProjectM[];
  joinDate: Date;
  fireDate: Date;
}
