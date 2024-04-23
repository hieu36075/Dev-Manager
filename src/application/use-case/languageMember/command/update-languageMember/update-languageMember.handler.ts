import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateLanguageMemberCommand } from "./update-languageMember.command";
import { Inject, NotAcceptableException } from "@nestjs/common";
import { InjectionToken } from "@/application/common/constants/constants";
import { ILanguageRepository } from "@/domain/repositories/language.repository";
import { ILanguageMemberRepository } from "@/domain/repositories/languageMember.repository";
import { Connection } from 'typeorm';

@CommandHandler(UpdateLanguageMemberCommand)
export class UpdateLanguageMemberHandler implements ICommandHandler<UpdateLanguageMemberCommand>{
    constructor(
        @Inject(InjectionToken.LANGUAGE_REPOSITORY)
        private readonly languageRepository : ILanguageRepository,
        @Inject(InjectionToken.LANGUAGEMEMBER_REPOSITORY)
        private readonly languageMemberRepository : ILanguageMemberRepository,
        private readonly connection: Connection,
    ){

    }
    async execute(command: UpdateLanguageMemberCommand): Promise<any> {
        return await this.connection.transaction(async (manager) => {

            const newLanguage = await this.languageRepository.findById(command.languageId);
            if(!newLanguage) throw new NotAcceptableException({message:"Error"})
            return await this.languageMemberRepository.update(command.id, {
                language: newLanguage,
                level: command.level,
                experience: command.experience
            }, manager)
        })
    }
}