import { ICommand } from "@nestjs/cqrs";

export class CreateLanguageCommand implements ICommand{
    constructor(
        public readonly name: string,
    ){

    }
}