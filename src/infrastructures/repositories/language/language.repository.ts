import { LanguageM } from "@/domain/model/language.model";
import { ILanguageRepository } from "@/domain/repositories/language.repository";
import { Language } from "@/infrastructures/entities/language.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class LanguageRepositoryOrm implements ILanguageRepository{
    constructor(
        @InjectRepository(Language)
        private readonly languageRepository : Repository<Language>
    ){

    }
    findAll(option?: any): Promise<LanguageM[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<LanguageM> {
        throw new Error("Method not implemented.");
    }
    create(entity: LanguageM, manager?: any): Promise<LanguageM> {
        throw new Error("Method not implemented.");
    }
    update(id: string, entity: Partial<LanguageM>, manager?: any): Promise<LanguageM> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}