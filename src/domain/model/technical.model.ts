import { ProfileM } from "./profile.model";
import { TechnicalMemberM } from "./technicalMember.model";
import { TechnicalProjectM } from "./technicalProject.model";

export class TechnicalM {
  id: string;
  name: string;
  // profile: ProfileM;
  isDelete: boolean;
  technicalMember: TechnicalMemberM[];
  technicalProject: TechnicalProjectM[];
  created_at: Date;
  updated_at: Date;
}