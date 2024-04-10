import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePositionCommand } from "./create-position.command";
import { PositionRepositoryOrm } from "@/infrastructures/repositories/position/position.repository";
import { ForbiddenException } from "@nestjs/common";
import { PositionM } from "@/domain/model/position.model";

@CommandHandler(CreatePositionCommand)
export class CreatePositionHandler implements ICommandHandler<CreatePositionCommand>{
    constructor(
        private readonly positionRepository : PositionRepositoryOrm
    ){

    }
    async execute(command: CreatePositionCommand): Promise<PositionM> {
        const {name, description} = command
        try{
            const position = await this.positionRepository.create({name: name,description:description})
            return position
        }catch(error){
            throw new ForbiddenException({message: "Create Failed"})
        }
    }
}