import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteLanguageMemberCommand } from "./delete-languageMember.command";
import { Inject } from "@nestjs/common";
import { InjectionToken } from "@/application/common/constants/constants";
import { ILanguageMemberRepository } from "@/domain/repositories/languageMember.repository";
import { Connection } from 'typeorm';
@CommandHandler(DeleteLanguageMemberCommand)
export class DeleteLanguageMemberHandler implements ICommandHandler<DeleteLanguageMemberCommand>{
    constructor(
        @Inject(InjectionToken.LANGUAGEMEMBER_REPOSITORY)
        private readonly languageMemberRepository : ILanguageMemberRepository,
        private readonly connection: Connection,
    ){

    }
    async execute(command: DeleteLanguageMemberCommand): Promise<any> {
        return await this.connection.transaction(async (manager) => {
            await this.languageMemberRepository.delete(command.id, manager)
        })
    }
}