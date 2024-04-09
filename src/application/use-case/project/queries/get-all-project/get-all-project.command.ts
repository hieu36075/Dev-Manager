import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllProjectQuery } from "./get-all-project.handler";
import { ProjectRepositoryOrm } from "@/infrastructures/repositories/project/project.repository";
import { ForbiddenException } from "@nestjs/common";

@QueryHandler(GetAllProjectQuery)
export class GetAllProjectQueryHandler implements IQueryHandler<GetAllProjectQuery>{
    constructor(
        private readonly projectRepositoryOrm : ProjectRepositoryOrm
    ) {
        
    }

    async execute(query: GetAllProjectQuery): Promise<any> {
        try{
            const project = await this.projectRepositoryOrm.findAll();

            return project
        }catch(error){
            throw new ForbiddenException({message:"Query failed"})
        }
    }
}