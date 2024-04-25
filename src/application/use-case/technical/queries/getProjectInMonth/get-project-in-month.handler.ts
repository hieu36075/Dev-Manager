// get-all-users-query.handler.ts
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProfileRepositoryOrm } from "@/infrastructures/repositories/profile/profile.repository";
import { ForbiddenException } from "@nestjs/common";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { GetProjectInMonthQuery } from "./get-project-in-month.command";
import { ProjectRepositoryOrm } from "@/infrastructures/repositories/project/project.repository";


@QueryHandler(GetProjectInMonthQuery)
export class GetProjectInMonthHandler implements IQueryHandler<GetProjectInMonthQuery> {
  constructor(
    private readonly projectRepository: ProjectRepositoryOrm,
    ) {}

  async execute(query: GetProjectInMonthQuery): Promise<any> {
    // const {id} = query
    try{
      const data = await this.projectRepository.getProjectInMonth();
      return data

    }catch(error){
      throw new ForbiddenException();
    }
    // return new GetAllUserResponse(users);
  }
}