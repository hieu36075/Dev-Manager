import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
// import { CreatePositionCommand } from "./create-position.command";
import { PositionRepositoryOrm } from "@/infrastructures/repositories/position/position.repository";
import { ForbiddenException } from "@nestjs/common";
import { PositionM } from "@/domain/model/position.model";
import { CreateSkillCommand } from "./create-skill.command";
import { SkillM } from "@/domain/model/skill.model";
import { SkillRepositoryOrm } from "@/infrastructures/repositories/skill/skill.repository";

@CommandHandler(CreateSkillCommand)
export class CreateSkillHandler implements ICommandHandler<CreateSkillCommand>{
    constructor(
        private readonly skillRepository : SkillRepositoryOrm
    ){

    }
    async execute(command: CreateSkillCommand): Promise<SkillM> {
        const {name} = command
        if(name.trim() === '' ){
            throw new ForbiddenException("Error data")
        }
        try{
            const skill = await this.skillRepository.create({name: name})
            return skill
        }catch(error){
            throw new ForbiddenException({message: "Create Failed"})
        }
    }
}