import { ICommand } from "@nestjs/cqrs";

export class CreateAccountCommand implements ICommand{
    constructor(
        public readonly name:string,
        public readonly password: string,
        public readonly email: string
    ){}
}