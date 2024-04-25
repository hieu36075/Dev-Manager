import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ForbiddenException, Inject } from "@nestjs/common";
import { InjectionToken } from "@/application/common/constants/constants";
import { ILanguageRepository } from "@/domain/repositories/language.repository";
import { GetAllLanguagePaginationQuery } from "./get-all-language-pagination.command";


@QueryHandler(GetAllLanguagePaginationQuery)
export class GetAllLanguagePaginationQueryHandler implements IQueryHandler<GetAllLanguagePaginationQuery> {
    constructor(
        @Inject(InjectionToken.LANGUAGE_REPOSITORY)
        private readonly languageRepository : ILanguageRepository,
    ) {}

    async execute(query: GetAllLanguagePaginationQuery): Promise<any> {
        const { pageOptionsDto } = query
        try {
            const language = await this.languageRepository.findAllOptions(pageOptionsDto);
            return language
        } catch (error) {
            throw new ForbiddenException({ message: "Query failed",  })
        }
    }
}