import { ICommand } from "@nestjs/cqrs";

export class DeleteEmployeeProjectCommand implements ICommand{
    constructor(
        public readonly id:string,
    ){

    }
}