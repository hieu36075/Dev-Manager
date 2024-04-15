import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ForbiddenException } from "@nestjs/common";

import { LanguageRepositoryOrm } from "@/infrastructures/repositories/language/language.repository";
import { LanguageM } from "@/domain/model/language.model";
import { UpdateLanguageCommand } from "./update-language.handler";

@CommandHandler(UpdateLanguageCommand)
export class UpdateLanguageHandler implements ICommandHandler<UpdateLanguageCommand>{
    constructor(
        private readonly languageRepository : LanguageRepositoryOrm
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