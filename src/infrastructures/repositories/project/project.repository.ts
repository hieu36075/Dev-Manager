import { CreateProjectDTO } from "@/application/dto/project/create-project.dto";
import { UpdateProjectDTO } from "@/application/dto/project/update-project.dto";
import { ProjectM } from "@/domain/model/project.model";
import { IProjectRepository } from "@/domain/repositories/project.repository";
import { Project } from "@/infrastructures/entities/project.enity";
import { ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { parseISO } from "date-fns";
import { Repository } from "typeorm";

export class ProjectRepositoryOrm implements IProjectRepository {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {

    }
    async findAll(): Promise<ProjectM[]> {
        return await this.projectRepository.find()
    }
    async findById(id: string): Promise<ProjectM> {
        if (!id) {
            throw new ForbiddenException('Not have Id')
        }
        const project = await this.projectRepository.findOne({
            where: {
                id: id
            }
        })

        return project
    }
    async create(createProjectDTO: CreateProjectDTO): Promise<ProjectM> {
        const project = new ProjectM
        project.name = createProjectDTO.name
        project.description = createProjectDTO.description
        project.startDate = parseISO(createProjectDTO.startDate);
        project.endDate = parseISO(createProjectDTO.endDate);
        project.technical = createProjectDTO.technical

        return await this.projectRepository.save(project)
    }


    async update(id: string,updateProjectDTO: UpdateProjectDTO): Promise<ProjectM> {
        const projectToUpdate = await this.findById(id);
        if (!projectToUpdate) {
            throw new Error('Project not found');
        }

        projectToUpdate.name = updateProjectDTO.name;
        projectToUpdate.description = updateProjectDTO.description;
        projectToUpdate.startDate = parseISO(updateProjectDTO.startDate); 
        projectToUpdate.endDate = parseISO(updateProjectDTO.endDate);
        projectToUpdate.technical = updateProjectDTO.technical;
        return await this.projectRepository.save(projectToUpdate)
    }

    async  delete(id: string): Promise<void> {
        
    }
}