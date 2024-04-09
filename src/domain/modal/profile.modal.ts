// profile.modal.ts


import { GenderEnum } from '@/application/common/enums/gender.enum';
import { ProfileStatusEnum } from '@/application/common/enums/profile-status.enum';
import { Skill } from './skill.modal';
import { Position } from './position.modal';

export class Profile {
    id:string;
  fullName: string;
  phoneNumber: string;
  email: string;
  dayOfBirth: string;
  gender: GenderEnum;
  status: ProfileStatusEnum;
  skills: Skill[];
  positions: Position[];
  description: string;
}
