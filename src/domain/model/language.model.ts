import { LanguageMemberM } from "./languageMember.modal";
import { LanguageProjectM } from "./languageProject.modal";
import { ProfileM } from "./profile.model";

export class LanguageM {
    id: string;
    name: string;
    languageMember: LanguageMemberM[];
    languageProject: LanguageProjectM[]
    // profile: ProfileM
  }