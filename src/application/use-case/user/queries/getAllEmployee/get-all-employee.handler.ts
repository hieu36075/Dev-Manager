import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllProfileEmployeeQuery } from "./get-all-employee.command";
import { ProfileRepositoryOrm } from "@/infrastructures/repositories/profile/profile.repository";

@QueryHandler(GetAllProfileEmployeeQuery)
export class GetAllProfileEmployeeHandler implements IQueryHandler<GetAllProfileEmployeeQuery>{
    constructor(
        private readonly profileRepositoryOrm: ProfileRepositoryOrm
    ){

    }
    async execute(query: GetAllProfileEmployeeQuery): Promise<any> {
        const {projectId } = query
        const profile = await this.profileRepositoryOrm.getEmployee(projectId)
        return profile
    }
}