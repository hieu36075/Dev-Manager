import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
// import { CreatePositionCommand } from "./create-position.command";
import { ForbiddenException } from "@nestjs/common";
import { TechnicalM } from "@/domain/model/technical.model";
import { TechnicalRepositoryOrm } from "@/infrastructures/repositories/technical/technical.repository";
import { Connection } from 'typeorm';
import { DeleteTechnicalCommand } from "./delete-technical.command";
@CommandHandler(DeleteTechnicalCommand)
export class DeleteTechnicalHandler implements ICommandHandler<DeleteTechnicalCommand>{
    constructor(
        private readonly technicalRepository : TechnicalRepositoryOrm,
        private readonly connection: Connection,
    ){

    }
    async execute(command: DeleteTechnicalCommand): Promise<void> {
        return await this.connection.transaction(async (manager) => {
        try{
                const technical = await this.technicalRepository.delete(command.id,manager)
                return technical
            }catch(error){
                throw new ForbiddenException({message: "Create Failed"})
            }
        })
        }
}