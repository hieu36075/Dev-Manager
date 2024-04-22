
import { ProfileM } from './profile.model';
import { ProjectM } from './project.model';
import { TechnicalM } from './technical.model';
import { UserM } from './user.model';

export class TechnicalProjectM {
  id: string;
  project: ProjectM;
  technical: TechnicalM;
}
