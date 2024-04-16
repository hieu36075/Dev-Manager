import { PositionEnum } from "@/application/common/enums/position.enum";
import { ProjectM } from "@/domain/model/project.model";
import { UserM } from "@/domain/model/user.model";

export class CreateProjectMemberDTO{
    project : ProjectM
    user: UserM
    roles?: PositionEnum[]
}