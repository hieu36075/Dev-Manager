import { ProjectMember } from '@/infrastructures/entities/projectMember.entity';
import { ProfileM } from './profile.model';
import { ProjectMemberM } from './projectMember.model';

export class PositionM {
  id: string;
  name: string;
  description: string;
  profile: ProfileM;
  positions:PositionM[];
}
