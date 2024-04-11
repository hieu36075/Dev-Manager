import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProjectRepositoryOrm } from "@/infrastructures/repositories/project/project.repository";
import { ForbiddenException } from "@nestjs/common";
import { GetAllProjectQuery } from "./get-all-project.command";
import { PageDto } from "@/application/dto/pagination/responsePagination";
import { ProjectM } from "@/domain/model/project.model";

@QueryHandler(GetAllProjectQuery)
export class GetAllProjectQueryHandler implements IQueryHandler<GetAllProjectQuery> {
    constructor(
        private readonly projectRepositoryOrm: ProjectRepositoryOrm,
    ) {}

    async execute(query: GetAllProjectQuery): Promise<PageDto<ProjectM>> {
        const { pageOptionsDto } = query
        try {
            const project = await this.projectRepositoryOrm.findAll(pageOptionsDto);

            return project
        } catch (error) {
            throw new ForbiddenException({ message: "Query failed" })
        }
    }
}