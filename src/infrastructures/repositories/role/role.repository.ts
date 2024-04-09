import { RoleM } from "@/domain/modal/role.modal";
import { IRoleRepository } from "@/domain/repositories/role.repository";
import { Role } from "@/infrastructures/entities/role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class RoleRepositoryOrm implements IRoleRepository{
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository : Repository<Role>,
    ){

    }

    async findByName(name: string): Promise<RoleM> {
        const role =  await this.roleRepository.findOne({
            where:{
                name: name
            },
            relations: {
                users: true
            }
        })
        return role
    }
}