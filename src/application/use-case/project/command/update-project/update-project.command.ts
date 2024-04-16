import { ProjectStatusEnum } from "@/application/common/enums/project-status.enum";
import { ICommand } from "@nestjs/cqrs";

export class UpdateProjectCommand implements ICommand{
    constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly description: string,
        public readonly startDate:string,
        public readonly endDate:string,
        public readonly technical: string[],
        public readonly userId : string,
        public readonly status : ProjectStatusEnum
    ){

    }
}