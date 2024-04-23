import { LanguageMemberM } from "../model/languageMember.modal";
import { ProjectM } from "../model/project.model";
import { UserM } from "../model/user.model";
import { GenericRepository } from "./generic-repository";

export interface ILanguageMemberRepository extends GenericRepository<LanguageMemberM>{
    removeAllByUser(user:UserM):Promise<void>
}