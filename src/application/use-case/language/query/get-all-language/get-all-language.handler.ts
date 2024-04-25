import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ForbiddenException, Inject } from "@nestjs/common";
import { GetAllLanguageQuery } from "./get-all-language.command";
import { Language } from "@/infrastructures/entities/language.entity";
import { InjectionToken } from "@/application/common/constants/constants";
import { ILanguageRepository } from "@/domain/repositories/language.repository";


@QueryHandler(GetAllLanguageQuery)
export class GetAllLanguageQueryHandler implements IQueryHandler<GetAllLanguageQuery> {
    constructor(
        @Inject(InjectionToken.LANGUAGE_REPOSITORY)
        private readonly languageRepository : ILanguageRepository,
    ) {}

    async execute(query: GetAllLanguageQuery): Promise<any> {
        const { pageOptionsDto } = query
        try {
            const language = await this.languageRepository.findAllOptions(pageOptionsDto);
            return language
        } catch (error) {
            throw new ForbiddenException({ message: "Query failed",  })
        }
    }
}