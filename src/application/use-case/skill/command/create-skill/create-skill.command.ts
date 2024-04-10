import { ICommand } from "@nestjs/cqrs";

export class CreateSkillCommand implements ICommand{
    constructor(
        public readonly name: string,
    ){

    }
}