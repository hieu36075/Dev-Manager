import { RoleM } from "../modal/role.modal";

export interface IRoleRepository{
    // findAll():Promise<RoleM[]>
    findByName(name: string) : Promise<RoleM>
    
}