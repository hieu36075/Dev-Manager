import { CreateProjectDTO } from "@/application/dto/project/create-project.dto";
import { ProjectM } from "../model/project.model";
import { UpdateProjectDTO } from "@/application/dto/project/update-project.dto";


export interface IProjectRepository{
    findAll(): Promise<ProjectM[]>;
    findById(id: string): Promise<ProjectM | undefined>;
    create(entity: CreateProjectDTO): Promise<ProjectM>;
    update(id: string, entity: Partial<CreateProjectDTO>): Promise<ProjectM | undefined>;
    delete(id: string): Promise<void>;
}