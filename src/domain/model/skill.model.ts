import { ProfileM } from "./profile.model";
import { TechnicalMemberM } from "./technicalMember.model";

export class TechnicalM {
  id: string;
  name: string;
  // profile: ProfileM;
  technicalMember: TechnicalMemberM[];
}