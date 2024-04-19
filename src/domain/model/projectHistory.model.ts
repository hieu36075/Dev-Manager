import { ProjectM } from './project.model';
import { UserM } from './user.model';

export class ProjectHistoryM {
  id: string;
  project: ProjectM;
  user: UserM;
  type: string;
  description: string;
  createDate: Date;
  updateDate: Date;
}
