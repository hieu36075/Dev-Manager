import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import { LanguageM } from "../model/language.model";
import { GenericRepository } from "./generic-repository";
import { PageDto } from "@/application/dto/pagination/responsePagination";

export interface ILanguageRepository extends GenericRepository<LanguageM>{
    findAllOptions(pageOptionsDto: PageOptionsDto): Promise<PageDto<LanguageM>>
    
}