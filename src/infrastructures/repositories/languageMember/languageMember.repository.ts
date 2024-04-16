import { LanguageMemberM } from "@/domain/model/languageMember.modal";
import { ILanguageMemberRepository } from "@/domain/repositories/languageMember.repository";
import { LanguageMember } from "@/infrastructures/entities/languageMember.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class LanguageMemberRepositoryOrm implements ILanguageMemberRepository{
    constructor(
        @InjectRepository(LanguageMember)
        private readonly languageMemberRepository: Repository<LanguageMember>
    ){

    }
    async findAll(option?: any): Promise<LanguageMemberM[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<LanguageMemberM> {
        throw new Error("Method not implemented.");
    }
    async create(entity: Partial<LanguageMemberM>, manager?: any): Promise<LanguageMemberM> {
        const languageMember = new LanguageMember
        languageMember.language = entity.language
        languageMember.user = entity.user
        return await manager.save(languageMember)
    }
    update(id: string, entity: Partial<LanguageMemberM>, manager?: any): Promise<LanguageMemberM> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}