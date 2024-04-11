// profile.modal.ts


import { GenderEnum } from '@/application/common/enums/gender.enum';
import { ProfileStatusEnum } from '@/application/common/enums/profile-status.enum';
import { SkillM } from './skill.model';
import { Skill } from '@/infrastructures/entities/skill.entity';
import { PositionM } from './position.model';
import { UserM } from './user.model';


export class ProfileM {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  dayOfBirth: Date;
  avatarUrl: string;
  gender: GenderEnum;
  status: ProfileStatusEnum;
  skills: SkillM[]
  positions: PositionM[];
  description: string;
  user: UserM
}
