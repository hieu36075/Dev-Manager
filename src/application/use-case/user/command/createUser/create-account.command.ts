import { ICommand } from "@nestjs/cqrs";

export class CreateAccountCommand implements ICommand{
    constructor(
        public readonly email: string,
        public readonly userName:string,
        public readonly password: string,

    ){}
}