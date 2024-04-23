import { ICommand } from "@nestjs/cqrs";

export class DeleteLanguageCommand implements ICommand{
    constructor(
        public readonly id: string,        
    ){

    }
}