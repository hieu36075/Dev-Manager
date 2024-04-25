import { LanguageMemberM } from "./languageMember.modal";
import { LanguageProjectM } from "./languageProject.modal";
import { ProfileM } from "./profile.model";

export class LanguageM {
    id: string;
    name: string;
    isDelete: boolean;
    languageMember: LanguageMemberM[];
    languageProject: LanguageProjectM[];
    created_at: Date;
    updated_at: Date;
    // profile: ProfileM
  }