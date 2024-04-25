import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TechnicalRepositoryOrm } from "@/infrastructures/repositories/technical/technical.repository";
import { TechnicalM } from "@/domain/model/technical.model";
import { GetAllTechnicalPaginationQuery } from "./get-all-technical.command";

@QueryHandler(GetAllTechnicalPaginationQuery)
export class GetAllTechnicalPaginationHandler implements IQueryHandler<GetAllTechnicalPaginationQuery>{
    constructor(
        private readonly technicalRepository : TechnicalRepositoryOrm,
       
    ){

    }
    async execute(query: GetAllTechnicalPaginationQuery): Promise<any> {
        const { pageOptionsDto } = query
        const technical = await this.technicalRepository.findAllOptions(pageOptionsDto)
        
        return technical
    }
}