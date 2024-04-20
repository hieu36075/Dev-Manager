import { PositionEnum } from "@/application/common/enums/position.enum";
import { PositionM } from "@/domain/model/position.model";
import { ICommand } from "@nestjs/cqrs";

export class AddUserProjectCommand implements ICommand{
    constructor(
        public readonly employeeId:string,
        public readonly projectId: string,
        // public readonly r:{}
        public readonly roles: []

    ){

    }
}