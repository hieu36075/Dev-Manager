import { ProfileM } from "@/domain/model/profile.model";
import { IProfileRepository } from "@/domain/repositories/profile.repository";

export class ProfileRepositoryOrm implements IProfileRepository{
    constructor(){
        
    }
    
    findAll(): Promise<ProfileM[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<ProfileM> {
        throw new Error("Method not implemented.");
    }
    async create(entity: ProfileM): Promise<ProfileM> {
        throw new Error("Method not implemented.");
    }
    update(id: string, entity: Partial<ProfileM>): Promise<ProfileM> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}