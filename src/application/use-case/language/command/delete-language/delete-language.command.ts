import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ForbiddenException, Inject } from "@nestjs/common";
import { Connection } from 'typeorm';
import { PositionRepositoryOrm } from "@/infrastructures/repositories/position/position.repository";
import { DeleteLanguageCommand } from "./delete-laguage.handler";
import { InjectionToken } from "@/application/common/constants/constants";
import { ILanguageRepository } from "@/domain/repositories/language.repository";
@CommandHandler(DeleteLanguageCommand)
export class DeleteLanguageHandler implements ICommandHandler<DeleteLanguageCommand>{
    constructor(
        @Inject(InjectionToken.LANGUAGE_REPOSITORY)
        private readonly languageRepository : ILanguageRepository ,
        private readonly connection: Connection,
    ){

    }
    async execute(command: DeleteLanguageCommand): Promise<void> {
        return await this.connection.transaction(async (manager) => {
        try{
                const language = await this.languageRepository.delete(command.id)
                return language
            }catch(error){
                throw new ForbiddenException({message: "delete Failed"})
            }
        })
        }
}