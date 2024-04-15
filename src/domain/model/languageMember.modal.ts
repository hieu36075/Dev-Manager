import { LanguageM } from "./language.model";
import { UserM } from "./user.model";


export class LanguageMemberM {
  id: string;
  language: LanguageM;
  user: UserM;

}
