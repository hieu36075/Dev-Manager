import { ICommand } from "@nestjs/cqrs";

export class DeletePositionCommand implements ICommand{
    constructor(
        public readonly id: string,        
    ){

    }
}