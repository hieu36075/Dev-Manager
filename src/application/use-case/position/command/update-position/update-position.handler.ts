import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
// import { CreatePositionCommand } from "./create-position.command";
import { ForbiddenException } from "@nestjs/common";
import { TechnicalM } from "@/domain/model/technical.model";
import { TechnicalRepositoryOrm } from "@/infrastructures/repositories/technical/technical.repository";
import { Connection } from 'typeorm';
import { UpdatePositionCommand } from "./update-position.command";
import { PositionRepositoryOrm } from "@/infrastructures/repositories/position/position.repository";
import { PositionM } from "@/domain/model/position.model";
@CommandHandler(UpdatePositionCommand)
export class UpdatePositionHandler implements ICommandHandler<UpdatePositionCommand>{
    constructor(
        private readonly positionRepository : PositionRepositoryOrm,
        private readonly connection: Connection,
    ){

    }
    async execute(command: UpdatePositionCommand): Promise<PositionM> {
        return await this.connection.transaction(async (manager) => {
        try{
                const technical = await this.positionRepository.update(command.id,command)
                return technical
            }catch(error){
                throw new ForbiddenException({message: "update Failed"})
            }
        })
        }
}