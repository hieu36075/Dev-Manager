import { CreateProjectDTO } from "@/application/dto/project/create-project.dto";
import { ProjectM } from "../model/project.model";
import { PageDto } from "@/application/dto/pagination/responsePagination";


export interface IProjectRepository{
    findAll(pageOptionsDto: any): Promise<PageDto<ProjectM>>;
    findById(id: string): Promise<ProjectM | undefined>;
    create(entity: CreateProjectDTO, manager: any): Promise<ProjectM>;
    update(id: string, entity: Partial<CreateProjectDTO>): Promise<ProjectM | undefined>;
    delete(id: string, manager:any): Promise<void>;
}