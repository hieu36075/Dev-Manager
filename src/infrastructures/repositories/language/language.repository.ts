import { PageMetaDto } from "@/application/dto/pagination/pageMeta.dto";
import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import { PageDto } from "@/application/dto/pagination/responsePagination";
import { LanguageM } from "@/domain/model/language.model";
import { ILanguageRepository } from "@/domain/repositories/language.repository";
import { Language } from "@/infrastructures/entities/language.entity";
import { BadRequestException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";

export class LanguageRepositoryOrm implements ILanguageRepository{
    constructor(
        @InjectRepository(Language)
        private readonly languageRepository : Repository<Language>
    ){

    }
    async findAll():Promise<Language[]>{
        return await this.languageRepository.find({
            where:{
                isDelete:false
            }
        })
    }
    async findAllByFilter(pageOptionsDto: PageOptionsDto): Promise<any> {
        // throw new Error("Method not implemented.");
        const { name, page, take, orderBy } = pageOptionsDto;
        const takeData = take || 10;
        const skip = (page - 1) * take;
        const [result, total] = await this.languageRepository.findAndCount({
          where: {
            name: name ? Like(`%${name}%`) : Like(`%%`),
          },
          relations:{
            // user:{
            //     profile:true
            // }
          },
          select:{
            // user:{
            // }
          },
          skip: skip,
          take: takeData,
        });

        
        const pageMetaDto = new PageMetaDto(pageOptionsDto, total);
        return new PageDto<LanguageM>(result, pageMetaDto, 'Success');
    }
    async findById(id: string): Promise<LanguageM> {
        if(!id){
            throw new ForbiddenException({message:"Please Check Data Again"})
        }
        try {
            
            const language = await this.languageRepository.findOne({
                where:{
                    id:id
                },
                relations:{
                    languageProject:true
                }
            })

            return language
        } catch (error) {
            console.log(error)
        }
    }
    async create(entity: Partial<LanguageM>, manager?: any): Promise<LanguageM> {
        const language = new LanguageM
        language.name = entity.name
        return await this.languageRepository.save(language)
    }
    async update(id: string, entity: Partial<LanguageM>, manager?: any): Promise<LanguageM> {
        const language = await this.findById(id)
        if(!language){
            throw new ForbiddenException({message: 'Not Found Id'})
        }
        language.name = entity.name
        return await this.languageRepository.save(language)
    }
    async delete(id: string): Promise<void> {
        const language = await this.findById(id)
        language.isDelete = true
         await this.languageRepository.save(language)
    }
}