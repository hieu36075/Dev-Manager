import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ForbiddenException, Inject } from "@nestjs/common";
import { LanguageM } from "@/domain/model/language.model";
import { UpdateLanguageCommand } from "./update-language.handler";
import { InjectionToken } from "@/application/common/constants/constants";
import { ILanguageRepository } from "@/domain/repositories/language.repository";

@CommandHandler(UpdateLanguageCommand)
export class UpdateLanguageHandler implements ICommandHandler<UpdateLanguageCommand>{
    constructor(
        @Inject(InjectionToken.LANGUAGE_REPOSITORY)
        private readonly languageRepository : ILanguageRepository,
    ){

    }
    async execute(command: UpdateLanguageCommand): Promise<LanguageM> {
        const {id,name} = command
        if(name.trim() === '' ){
            throw new ForbiddenException("Error data")
        }
        try{
            const language = await this.languageRepository.update(id,{name: name})
            return language
        }catch(error){
            console.log(error)
            throw new ForbiddenException({message: "Create Failed"})
        }
    }
}