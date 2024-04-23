import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
// import { CreatePositionCommand } from "./create-position.command";
import { ForbiddenException } from "@nestjs/common";
import { TechnicalM } from "@/domain/model/technical.model";
import { TechnicalRepositoryOrm } from "@/infrastructures/repositories/technical/technical.repository";
import { UpdateTechnicalCommand } from "./update-technical.command";
import { Connection } from 'typeorm';
@CommandHandler(UpdateTechnicalCommand)
export class UpdateTechnicalHandler implements ICommandHandler<UpdateTechnicalCommand>{
    constructor(
        private readonly technicalRepository : TechnicalRepositoryOrm,
        private readonly connection: Connection,
    ){

    }
    async execute(command: UpdateTechnicalCommand): Promise<TechnicalM> {
        return await this.connection.transaction(async (manager) => {
        try{
                const technical = await this.technicalRepository.update(command.id,command,manager)
                return technical
            }catch(error){
                throw new ForbiddenException({message: "Create Failed"})
            }
        })
        }
}