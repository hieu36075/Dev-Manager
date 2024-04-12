// get-all-users-query.handler.ts
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllUserQuery } from "./get-all-user.command";
import { ProfileRepositoryOrm } from "@/infrastructures/repositories/profile/profile.repository";
import { ForbiddenException } from "@nestjs/common";


@QueryHandler(GetAllUserQuery)
export class GetAllUserHandler implements IQueryHandler<GetAllUserQuery> {
  constructor(
    private readonly profileRepository: ProfileRepositoryOrm,
    ) {}

  async execute(query: GetAllUserQuery): Promise<any> {
    try{
      const users = await this.profileRepository.findAll();
      console.log(users)
      return users

    }catch(error){
      throw new ForbiddenException();
    }
    // return new GetAllUserResponse(users);
  }
}