// get-all-users-query.handler.ts
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProfileRepositoryOrm } from "@/infrastructures/repositories/profile/profile.repository";
import { ForbiddenException } from "@nestjs/common";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { GetUserWithoutProjectQuery } from "./getUserWithoutProject.command";



@QueryHandler(GetUserWithoutProjectQuery)
export class GetUserWithougtProjectHandler implements IQueryHandler<GetUserWithoutProjectQuery> {
  constructor(
    private readonly userRepository: UserRepositoryOrm,
    ) {}

  async execute(query: GetUserWithoutProjectQuery): Promise<any> {
    try{
      const users = await this.userRepository.countUsersWithoutProjects();
      return users

    }catch(error){
        console.log(error)
      throw new ForbiddenException();
    }
    // return new GetAllUserResponse(users);
  }
}