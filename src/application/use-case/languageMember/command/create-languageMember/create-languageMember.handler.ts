import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, NotAcceptableException } from "@nestjs/common";
import { InjectionToken } from "@/application/common/constants/constants";
import { ILanguageRepository } from "@/domain/repositories/language.repository";
import { ILanguageMemberRepository } from "@/domain/repositories/languageMember.repository";
import { Connection } from 'typeorm';
import { CreateLanguageMemberCommand } from "./create-languageMember.command";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";

@CommandHandler(CreateLanguageMemberCommand)
export class CreateLanguageMemberHandler implements ICommandHandler<CreateLanguageMemberCommand>{
    constructor(
        @Inject(InjectionToken.LANGUAGE_REPOSITORY)
        private readonly languageRepository : ILanguageRepository,
        @Inject(InjectionToken.LANGUAGEMEMBER_REPOSITORY)
        private readonly languageMemberRepository : ILanguageMemberRepository,
        private readonly userRepository : UserRepositoryOrm,
        private readonly connection: Connection,
    ){

    }
    async execute(command: CreateLanguageMemberCommand): Promise<any> {
        return await this.connection.transaction(async (manager) => {

            const newLanguage = await this.languageRepository.findById(command.id);
            const user = await this.userRepository.findById(command.userId)
            if(!newLanguage) throw new NotAcceptableException({message:"Error"})
            return await this.languageMemberRepository.create({
                user:user,
                language: newLanguage,
                level: command.level,
                experience: command.experience
            }, manager)
        })
    }
}