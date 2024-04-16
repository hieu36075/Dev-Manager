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

    async execute(query: GetAllLanguageQuery): Promise<Language[]> {
        // const { pageOptionsDto } = query
        try {
            const language = await this.languageRepository.findAll();
            return language
        } catch (error) {
            throw new ForbiddenException({ message: "Query failed",  })
        }
    }
}