import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ForbiddenException, Inject } from "@nestjs/common";
import { CreateLanguageCommand } from "./create-language.command";
import { LanguageM } from "@/domain/model/language.model";
import { InjectionToken } from "@/application/common/constants/constants";
import { ILanguageRepository } from "@/domain/repositories/language.repository";

@CommandHandler(CreateLanguageCommand)
export class CreateLanguageHandler implements ICommandHandler<CreateLanguageCommand>{
    constructor(
        @Inject(InjectionToken.LANGUAGE_REPOSITORY)
        private readonly languageRepository : ILanguageRepository,
    ){

    }
    async execute(command: CreateLanguageCommand): Promise<LanguageM> {
        const {name} = command
        if(name.trim() === '' ){
            throw new ForbiddenException("Error data")
        }
        try{
            const language = await this.languageRepository.create({name: name})
            return language
        }catch(error){
            throw new ForbiddenException({message: "Create Failed"})
        }
    }
}