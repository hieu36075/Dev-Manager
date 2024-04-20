import { PositionEnum } from "@/application/common/enums/position.enum";
import { CreateProjectMemberDTO } from "@/application/dto/projectMember/create-projectMember.dto";
import { ProfileM } from "@/domain/model/profile.model";
import { ProjectMemberM } from "@/domain/model/projectMember.model";
import { UserM } from "@/domain/model/user.model";
import { IProjectMemberRepository } from "@/domain/repositories/projectMember.repository";
import { ProjectMember } from "@/infrastructures/entities/projectMember.entity";
import { User } from "@/infrastructures/entities/user.entity";
import { NotAcceptableException } from "@nestjs/common";
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
    async findById(id: string): Promise<ProjectMemberM> {
        if(!id){
            throw new NotAcceptableException()
        }
        return await this.projectMemberRepository.findOne({
            where:{
                id:id
            },
            relations:{
                roles:true,
                user:{
                    profile:true
                },
                project:true
            },
            select:{
                roles:true,
                // project:true

            }
        })
    }
    async create(entity: CreateProjectMemberDTO, manager: EntityManager): Promise<ProjectMemberM> {
        const projectMember = new ProjectMember();
        projectMember.project = entity.project;
        projectMember.user = entity.user;
        // projectMember.roles = entity.roles 
        return await manager.save(projectMember);
    }
    update(id: string, entity: Partial<ProjectMemberM>): Promise<ProjectMemberM> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string, manager?: EntityManager): Promise<void> {
        const currentMember = await this.findById(id)
        await manager.remove(currentMember)
    }

    async findUserInProject(user:UserM): Promise<ProjectMember[]>{
        return await this.projectMemberRepository.find({
            where:{
                user: user
            }
        })
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