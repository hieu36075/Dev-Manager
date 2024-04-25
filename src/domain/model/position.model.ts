import { ProjectMember } from '@/infrastructures/entities/projectMember.entity';
import { ProfileM } from './profile.model';
import { ProjectMemberM } from './projectMember.model';
import { RoleMemberProjectM } from './roleMemberProject.model';
import { PositionMemberM } from './positionMember.model';

export class PositionM {
  id: string;
  name: string;
  description: string;
  isDelete: boolean;
  // profile: ProfileM;
  positions:RoleMemberProjectM[];
  positionMember: PositionMemberM[];
  created_at: Date;
  updated_at: Date;
}
