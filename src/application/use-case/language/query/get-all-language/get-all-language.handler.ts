import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ForbiddenException } from "@nestjs/common";
import { PageDto } from "@/application/dto/pagination/responsePagination";
import { ProjectM } from "@/domain/model/project.model";
import { GetAllLanguageQuery } from "./get-all-language.command";
import { LanguageRepositoryOrm } from "@/infrastructures/repositories/language/language.repository";
import { Language } from "@/infrastructures/entities/language.entity";


@QueryHandler(GetAllLanguageQuery)
export class GetAllLanguageQueryHandler implements IQueryHandler<GetAllLanguageQuery> {
    constructor(
        private readonly languageRepository : LanguageRepositoryOrm
    ) {}

    async execute(query: GetAllLanguageQuery): Promise<PageDto<Language>> {
        const { pageOptionsDto } = query
        try {
            const project = await this.languageRepository.findAll(pageOptionsDto);
            console.log(project)
            return project
        } catch (error) {
            console.log(error)
            throw new ForbiddenException({ message: "Query failed",  })
        }
    }
}