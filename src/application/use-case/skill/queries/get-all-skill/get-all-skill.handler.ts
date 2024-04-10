import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllSkillQuery } from "./get-all-skill.command";
import { SkillRepositoryOrm } from "@/infrastructures/repositories/skill/skill.repository";
import { SkillM } from "@/domain/model/skill.model";

@QueryHandler(GetAllSkillQuery)
export class GetAllSkillHandler implements IQueryHandler<GetAllSkillQuery>{
    constructor(
        private readonly skillRepository : SkillRepositoryOrm
    ){

    }
    async execute(query: GetAllSkillQuery): Promise<SkillM[]> {
        const skill = await this.skillRepository.findAll()
        return skill
    }
}