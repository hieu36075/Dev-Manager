import { PositionEnum } from "@/application/common/enums/position.enum";
import { ICommand } from "@nestjs/cqrs";

export class AddUserProjectCommand implements ICommand{
    constructor(
        public readonly userId:string,
        public readonly projectId: string,
        public readonly idManager: string,
        public readonly roles: PositionEnum[]

    ){

    }
}