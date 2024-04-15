import { LanguageM } from "./language.model";
import { ProjectM } from "./project.model";

export class LanguageProjectM {
  id: string;
  language: LanguageM;
  project: ProjectM;
  level: string;
  experience: string;
}
