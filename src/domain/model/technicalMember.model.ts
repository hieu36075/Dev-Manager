
import { ProfileM } from './profile.model';
import { ProjectM } from './project.model';
import { TechnicalM } from './skill.model';
import { UserM } from './user.model';

export class TechnicalMemberM {
  id: string;
  profile: ProfileM;
  technical: TechnicalM;

}
