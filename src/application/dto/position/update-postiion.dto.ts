import { PartialType } from "@nestjs/swagger";
import { CreatePositionDTO } from "./create-position.dto";

export class UpdatePostionDTO extends PartialType(CreatePositionDTO){}