import { PartialType } from "@nestjs/swagger";
import { CreateTechnicalDTO } from "./create-technical.dto";

export class UpdateTechnicalDTO extends PartialType(CreateTechnicalDTO){

}