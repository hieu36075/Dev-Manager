import { Project } from "@/infrastructures/entities/project.enity";
import { ProfileM } from "./profile.model";
import { ProjectM } from "./project.model";
import { ProjectMemberM } from "./projectMember.model";
import { RoleM } from "./role.model";
import { LanguageMemberM } from "./languageMember.modal";

export class UserM {
    id: string;
    email: string;
    userName: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    role: RoleM;
    projectMembers: ProjectMemberM[];
    languageMember: LanguageMemberM[];
    // profile: ProfileM;
    isManager: boolean;
    manager: UserM;
    managerId: string;
    project: ProjectM[]
}