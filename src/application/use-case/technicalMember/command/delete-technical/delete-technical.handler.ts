import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
// import { DeleteLanguageMemberCommand } from "./delete-languageMember.command";
import { Inject } from "@nestjs/common";
import { InjectionToken } from "@/application/common/constants/constants";
import { ILanguageMemberRepository } from "@/domain/repositories/languageMember.repository";
import { Connection } from 'typeorm';
import { DeleteTechnicalMemberCommand } from "./delete-technical.command";
import { ITechnicalMemberRepository } from "@/domain/repositories/technicalMember";
@CommandHandler(DeleteTechnicalMemberCommand)
export class DeleteTechnicalMemberHandler implements ICommandHandler<DeleteTechnicalMemberCommand>{
    constructor(
        @Inject(InjectionToken.TECHNICALMEMBER_REPOSITORY)
        private readonly technicalMemberRepository : ITechnicalMemberRepository,
        private readonly connection: Connection,
    ){

    }
    async execute(command: DeleteTechnicalMemberCommand): Promise<any> {
        return await this.connection.transaction(async (manager) => {
            return await this.technicalMemberRepository.delete(command.id, manager);
        })
    }
}