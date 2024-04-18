import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ForbiddenException, Inject } from "@nestjs/common";
import { GenerateCVQuery } from "./generate-cv.command";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { InjectionToken } from "@/application/common/constants/constants";
import { IDocxtemplateRepository } from "@/domain/adapter/docxtemplater.repository";


@QueryHandler(GenerateCVQuery)
export class GenerateCVQueryHandler implements IQueryHandler<GenerateCVQuery> {
    constructor(
        private readonly userRepository : UserRepositoryOrm,
        @Inject(InjectionToken.DOCXTEMPLATE_REPOSITORY)
        private readonly docxtemplateRepository : IDocxtemplateRepository
    ) {}

    async execute(query: GenerateCVQuery): Promise<any> {
        // const { pageOptionsDto } = query
        // try {
            const user = await this.userRepository.findById(query.id)
            // console.log(usẻ)
            const a = await this.docxtemplateRepository.generateWord(user)

            return a
            // const language = await this.languageRepository.findAll();
            // return language
        // } catch (error) {
        //     console.log(error)
        //     throw new ForbiddenException({ message: "Query failed",  })
        // }
    }
}