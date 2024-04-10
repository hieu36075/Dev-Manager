import { ICommand } from "@nestjs/cqrs";

export class CreatePositionCommand implements ICommand{
    constructor(
        public readonly name: string,
        public readonly description:string
    ){

    }
}