
import { PositionEnum } from '@/application/common/enums/position.enum';
import { ProjectM } from './project.model';
import { UserM } from './user.model';

export class ProjectMemberM {
  id: string;
  project: ProjectM;
  user: UserM;
  roles: PositionEnum[];
  joinDate: Date;
  fireDate: Date;
}
