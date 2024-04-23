import { PositionM } from "@/domain/model/position.model";
import { IPositionRepository } from "@/domain/repositories/position.model";
import { Position } from "@/infrastructures/entities/position.entity";
import { ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class PositionRepositoryOrm implements IPositionRepository{
    constructor(
        @InjectRepository(Position)
        private readonly positionRepository: Repository<Position>
    ){

    }
    async findAll(): Promise<PositionM[]> {
        return this.positionRepository.find({
            where:{
                isDelete:false
            }
        })
    }
    async findById(id: string): Promise<PositionM> {
        if(!id){
            throw new ForbiddenException({message:"Please Check Data Again"})
        }
        const position = await this.positionRepository.findOne({
            where:{
                id:id
            }
        })
        return position
    }
    async create(entity: Partial<PositionM>): Promise<PositionM> {
        const position = new PositionM
        position.name = entity.name
        position.description = entity.description

        return await this.positionRepository.save(position)

    }
    async update(id: string, entity: Partial<PositionM>): Promise<PositionM> {
        const position = await this.findById(id)
        if(!position){
            throw new ForbiddenException({message: 'Not Found Id'})
        }
        position.name = entity.name
        // position.profile = entity.profile

        return await this.positionRepository.save(position) 
    }
    async delete(id: string): Promise<void> {
        const position = await this.findById(id)
        position.isDelete = true
         await this.positionRepository.save(position)
    }

    async findRolesAndPushIntoArray(roleIds: string[]): Promise<PositionM[]> {
        const roles: PositionM[] = [];
    
        // Lặp qua từng ID trong mảng roleIds
        for (const roleId of roleIds) {
            // Tìm role bằng cách gọi findById
            const role = await this.findById(roleId);
            
            // Kiểm tra xem role có tồn tại không
            if (role) {
                // Đẩy role vào mảng roles
                roles.push(role);
            }
        }
    
        // Trả về mảng roles
        return roles;
    }
    
}