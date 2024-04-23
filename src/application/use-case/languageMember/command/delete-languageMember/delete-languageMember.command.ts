import { ICommand } from "@nestjs/cqrs";

export class DeleteLanguageMemberCommand implements ICommand{
    constructor(
        public readonly id: string,
    ){

    }
}