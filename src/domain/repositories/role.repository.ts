import { RoleM } from "../model/role.model";

export interface IRoleRepository{
    // findAll():Promise<RoleM[]>
    findByName(name: string) : Promise<RoleM>
    
}