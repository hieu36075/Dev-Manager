import { ICommand } from "@nestjs/cqrs";

export class UpdatePositionCommand implements ICommand{
    constructor(
        public readonly id: string,        
        public readonly name: string,
        public readonly description: string,
    ){

    }
}