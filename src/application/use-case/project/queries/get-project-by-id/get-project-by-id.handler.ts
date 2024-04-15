import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProjectRepositoryOrm } from "@/infrastructures/repositories/project/project.repository";
import { ForbiddenException } from "@nestjs/common";
import { ProjectM } from "@/domain/model/project.model";
import { GetProjectByIdQuery } from "./get-project-by-id.command";

@QueryHandler(GetProjectByIdQuery)
export class GetProjectByIdQueryHandler implements IQueryHandler<GetProjectByIdQuery> {
    constructor(
        private readonly projectRepositoryOrm: ProjectRepositoryOrm,
    ) {}

    async execute(query: GetProjectByIdQuery): Promise<ProjectM> {
        const { id } = query
        try {
            const project = await this.projectRepositoryOrm.findById(id);
            return project
        } catch (error) {
            throw new ForbiddenException({ message: "Query failed",  })
        }
    }
}