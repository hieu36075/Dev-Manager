import { Profile } from "./profile.modal";
import { ProjectMemberM } from "./projectMember.modal";
import { RoleM } from "./role.modal";

export class UserM{
    id: string;
    email: string;
    userName: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    role : RoleM;
    // projectMembers : ProjectMemberM[];
    // profile: Profile;
}