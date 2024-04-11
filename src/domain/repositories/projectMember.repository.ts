import { GenericRepository } from "./generic-repository";
import { ProjectMemberM } from "../model/projectMember.model";
import { ProfileM } from "../model/profile.model";


export interface IProjectMemberRepository extends GenericRepository<ProjectMemberM>{
    // getEmployeesByManagerAndProject(managerId: string, projectId: string): Promise<ProfileM[]>
}