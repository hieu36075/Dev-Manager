import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProjectDTO } from "./create-project.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateProjectDTO extends PartialType(CreateProjectDTO){
}