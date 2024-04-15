import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ForbiddenException } from "@nestjs/common";
import { CreateLanguageCommand } from "./create-language.command";
import { LanguageRepositoryOrm } from "@/infrastructures/repositories/language/language.repository";
import { LanguageM } from "@/domain/model/language.model";

@CommandHandler(CreateLanguageCommand)
export class CreateLanguageHandler implements ICommandHandler<CreateLanguageCommand>{
    constructor(
        private readonly languageRepository : LanguageRepositoryOrm
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