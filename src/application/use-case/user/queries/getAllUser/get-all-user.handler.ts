// get-all-users-query.handler.ts
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllUserQuery } from "./get-all-user.command";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { GetAllUserResponse } from "./get-all-user.response";
import { ProfileRepositoryOrm } from "@/infrastructures/repositories/profile/profile.repository";
import { ForbiddenException } from "@nestjs/common";

// import { Event } from "@/domain/entities/event";

@QueryHandler(GetAllUserQuery)
export class GetAllUserHandler implements IQueryHandler<GetAllUserQuery> {
  constructor(
    private readonly profileRepository: ProfileRepositoryOrm,
    ) {}

  async execute(query: GetAllUserQuery): Promise<any> {
    const { pageOptionsDto } = query
    try{
      const users = await this.profileRepository.findAll(pageOptionsDto);
      return users

    }catch(error){
      throw new ForbiddenException();
    }
    // return new GetAllUserResponse(users);
  }
}