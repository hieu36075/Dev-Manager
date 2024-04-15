import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllProfileEmployeeQuery } from "./get-all-employee.command";
import { ProfileRepositoryOrm } from "@/infrastructures/repositories/profile/profile.repository";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";

@QueryHandler(GetAllProfileEmployeeQuery)
export class GetAllProfileEmployeeHandler implements IQueryHandler<GetAllProfileEmployeeQuery>{
    constructor(
        private readonly userRepository: UserRepositoryOrm
    ){

    }
    async execute(query: GetAllProfileEmployeeQuery): Promise<any> {
        const {projectId } = query
        const profile = await this.userRepository.getEmployee(projectId)
        return profile
    }
}