import { CreateProjectMemberDTO } from "@/application/dto/projectMember/create-projectMember.dto";
import { ProjectMemberM } from "@/domain/model/projectMember.model";
import { IProjectMemberRepository } from "@/domain/repositories/projectMember.repository";
import { ProjectMember } from "@/infrastructures/entities/projectMember.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class ProjectMemberRepositoryOrm implements IProjectMemberRepository{
    constructor(
        @InjectRepository(ProjectMember)
        private readonly projectMemberRepository : Repository<ProjectMember>
    ){
        
    }
    findAll(): Promise<ProjectMemberM[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<ProjectMemberM> {
        throw new Error("Method not implemented.");
    }
    async create(entity: CreateProjectMemberDTO): Promise<ProjectMemberM> {
        const projectMember = new ProjectMemberM();
        projectMember.project = entity.project;
        projectMember.user = entity.user;
        return await this.projectMemberRepository.save(projectMember);
    }
    update(id: string, entity: Partial<ProjectMemberM>): Promise<ProjectMemberM> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}