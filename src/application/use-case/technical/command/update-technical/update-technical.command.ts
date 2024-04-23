import { ICommand } from "@nestjs/cqrs";

export class UpdateTechnicalCommand implements ICommand{
    constructor(
        public readonly id: string,        
        public readonly name: string,
    ){

    }
}