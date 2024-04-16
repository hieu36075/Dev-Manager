import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateProjectDTO } from "./create-project.dto";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ProjectStatusEnum } from "@/application/common/enums/project-status.enum";

export class UpdateProjectDTO extends PartialType(CreateProjectDTO){
    @ApiPropertyOptional({enum:ProjectStatusEnum, default: ProjectStatusEnum.Pending})
    @IsEnum(ProjectStatusEnum)
    @IsOptional()
    readonly status : ProjectStatusEnum = ProjectStatusEnum.Pending
}