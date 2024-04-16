import { PositionEnum } from "@/application/common/enums/position.enum";
import { CreateProjectMemberDTO } from "@/application/dto/projectMember/create-projectMember.dto";
import { ProfileM } from "@/domain/model/profile.model";
import { ProjectMemberM } from "@/domain/model/projectMember.model";
import { IProjectMemberRepository } from "@/domain/repositories/projectMember.repository";
import { ProjectMember } from "@/infrastructures/entities/projectMember.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

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
    async create(entity: CreateProjectMemberDTO, manager: EntityManager): Promise<ProjectMemberM> {
        const projectMember = new ProjectMember();
        projectMember.project = entity.project;
        projectMember.user = entity.user;
        projectMember.roles = entity.roles || [PositionEnum.BA]
        return await manager.save(projectMember);
    }
    update(id: string, entity: Partial<ProjectMemberM>): Promise<ProjectMemberM> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    // async getEmployeesByManagerAndProject(managerId: string, projectId: string): Promise<any> {
    //     const projectMembers = await this.projectMemberRepository.find({
    //       where: {
    //         manager: managerId,
    //         project: projectId,
    //       },
    //       relations: ['user', 'user.profile'],
    //     });
    
    //     const employees = projectMembers.map(member => member.user.profile);
    //     return employees;
    //   }
}