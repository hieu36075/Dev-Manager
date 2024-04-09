import { ProjectM } from "@/domain/model/project.model";
import { UserM } from "@/domain/model/user.model";

export class CreateProjectMemberDTO{
    project : ProjectM
    user: UserM
}