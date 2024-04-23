import { ICommand } from "@nestjs/cqrs";

export class DeleteTechnicalMemberCommand implements ICommand{
    constructor(
        public readonly id: string,
    ){

    }
}