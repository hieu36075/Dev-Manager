import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
// import { CreatePositionCommand } from "./create-position.command";
import { PositionRepositoryOrm } from "@/infrastructures/repositories/position/position.repository";
import { ForbiddenException } from "@nestjs/common";
import { PositionM } from "@/domain/model/position.model";
import { CreateTechnicalCommand } from "./create-technical.command";
import { TechnicalM } from "@/domain/model/technical.model";
import { TechnicalRepositoryOrm } from "@/infrastructures/repositories/technical/technical.repository";

@CommandHandler(CreateTechnicalCommand)
export class CreateTechnicalHandler implements ICommandHandler<CreateTechnicalCommand>{
    constructor(
        private readonly technicalRepository : TechnicalRepositoryOrm
    ){

    }
    async execute(command: CreateTechnicalCommand): Promise<TechnicalM> {
        const {name} = command
        if(name.trim() === '' ){
            throw new ForbiddenException("Error data")
        }
        try{
            const technical = await this.technicalRepository.create({name: name})
            return technical
        }catch(error){
            throw new ForbiddenException({message: "Create Failed"})
        }
    }
}