
import { ProjectM } from './project.model';
import { UserM } from './user.model';

export class ProjectMemberM {
  id: string;
  project: ProjectM;
  user: UserM;
  joinDate: Date;
  fireDate: Date;
}
