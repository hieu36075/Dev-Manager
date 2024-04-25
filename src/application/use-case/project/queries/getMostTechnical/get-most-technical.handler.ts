import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TechnicalRepositoryOrm } from "@/infrastructures/repositories/technical/technical.repository";

import { GetMostTechnicalQuery } from "./get-most-technical.command";
import { TechnicalProjectRepositoryOrm } from "@/infrastructures/repositories/technicalProject/technicalProject.repository";

@QueryHandler(GetMostTechnicalQuery)
export class GetMostTechnicalHandler implements IQueryHandler<GetMostTechnicalQuery>{
    constructor(
        private readonly technicalProjectRepository : TechnicalProjectRepositoryOrm,
       
    ){

    }
    async execute(query: GetMostTechnicalQuery): Promise<any[]> {
        const language = await this.technicalProjectRepository.findMostTechnical()
        const data=[]
        for (const [name, count] of language.entries()) {
            data.push({ name, count });
        }
        return data
    }
}