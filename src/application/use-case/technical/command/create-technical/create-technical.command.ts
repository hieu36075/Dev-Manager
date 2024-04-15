import { ICommand } from "@nestjs/cqrs";

export class CreateTechnicalCommand implements ICommand{
    constructor(
        public readonly name: string,
    ){

    }
}