
import { ProfileM } from './profile.model';
import { ProjectM } from './project.model';
import { TechnicalM } from './technical.model';
import { UserM } from './user.model';

export class TechnicalMemberM {
  id: string;
  user: UserM;
  technical: TechnicalM;
  level: string;
  experience: string;

}
