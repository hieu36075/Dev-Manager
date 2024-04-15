// get-all-users-query.handler.ts
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllUserQuery } from "./get-all-user.command";
import { ProfileRepositoryOrm } from "@/infrastructures/repositories/profile/profile.repository";
import { ForbiddenException } from "@nestjs/common";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";


@QueryHandler(GetAllUserQuery)
export class GetAllUserHandler implements IQueryHandler<GetAllUserQuery> {
  constructor(
    private readonly userRepository: UserRepositoryOrm,
    ) {}

  async execute(query: GetAllUserQuery): Promise<any> {
    const {isManager} = query
    try{
      const users = await this.userRepository.findByIsManager(isManager);
      console.log(users)
      return users

    }catch(error){
      throw new ForbiddenException();
    }
    // return new GetAllUserResponse(users);
  }
}