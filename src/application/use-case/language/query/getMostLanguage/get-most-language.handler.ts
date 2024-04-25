import { InjectionToken } from "@/application/common/constants/constants";
import { ILanguageRepository } from "@/domain/repositories/language.repository";
import { LanguageProjectRepositoryOrm } from "@/infrastructures/repositories/languageProject/languageProject.repository";
import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMostLanguageQuery } from "./get-most-language.command";

@QueryHandler(GetMostLanguageQuery)
export class GetMostLanguageHandler implements IQueryHandler<GetMostLanguageQuery>{
    constructor(
        private readonly languageProjectRepository : LanguageProjectRepositoryOrm,
        @Inject(InjectionToken.LANGUAGE_REPOSITORY)
        private readonly languageRepository : ILanguageRepository
       
    ){

    }
    async execute(query: GetMostLanguageQuery): Promise<any[]> {
        const language = await this.languageProjectRepository.findMostLanguage()
        const data=[]
        for (const [name, count] of language.entries()) {
            data.push({ name, count });
        }
        return data
    }
}