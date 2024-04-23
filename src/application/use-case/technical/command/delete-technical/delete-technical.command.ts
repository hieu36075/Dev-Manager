import { ICommand } from "@nestjs/cqrs";

export class DeleteTechnicalCommand implements ICommand{
    constructor(
        public readonly id: string,        
    ){

    }
}