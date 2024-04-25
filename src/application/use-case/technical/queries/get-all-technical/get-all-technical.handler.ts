import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllTechnicalQuery } from "./get-all-technical.command";
import { TechnicalRepositoryOrm } from "@/infrastructures/repositories/technical/technical.repository";
import { TechnicalM } from "@/domain/model/technical.model";

@QueryHandler(GetAllTechnicalQuery)
export class GetAllTechnicalHandler implements IQueryHandler<GetAllTechnicalQuery>{
    constructor(
        private readonly technicalRepository : TechnicalRepositoryOrm,
       
    ){

    }
    async execute(query: GetAllTechnicalQuery): Promise<any> {
        const technical = await this.technicalRepository.findAll()
        
        return technical
    }
}