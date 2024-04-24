import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ForbiddenException, NotAcceptableException } from "@nestjs/common";
import { Connection } from 'typeorm';
import { DeletePositionCommand } from "./delete-position.command";
import { PositionRepositoryOrm } from "@/infrastructures/repositories/position/position.repository";
@CommandHandler(DeletePositionCommand)
export class DeletePositionHandler implements ICommandHandler<DeletePositionCommand>{
    constructor(
        private readonly positionRepository : PositionRepositoryOrm,
        private readonly connection: Connection,
    ){

    }
    async execute(command: DeletePositionCommand): Promise<void> {
        return await this.connection.transaction(async (manager) => {
        try{    
                const currrentPosition = await this.positionRepository.findById(command.id)
                if(currrentPosition.positionMember.length >0) throw new NotAcceptableException({message: "Postion is in project!"})
                const technical = await this.positionRepository.delete(command.id)
                return technical
            }catch(error){
                throw new ForbiddenException({message: "delete Failed"})
            }
        })
        }
}