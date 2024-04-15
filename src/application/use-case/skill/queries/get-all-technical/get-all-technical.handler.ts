import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllTechnicalQuery } from "./get-all-technical.command";
import { TechnicalRepositoryOrm } from "@/infrastructures/repositories/technical/technical.repository";
import { TechnicalM } from "@/domain/model/skill.model";

@QueryHandler(GetAllTechnicalQuery)
export class GetAllTechnicalHandler implements IQueryHandler<GetAllTechnicalQuery>{
    constructor(
        private readonly skillRepository : TechnicalRepositoryOrm,
       
    ){

    }
    async execute(query: GetAllTechnicalQuery): Promise<TechnicalM[]> {
        const skill = await this.skillRepository.findAll()
        
        return skill
    }
}