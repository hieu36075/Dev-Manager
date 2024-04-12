// get-all-users-query.handler.ts
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";

import { ProfileRepositoryOrm } from "@/infrastructures/repositories/profile/profile.repository";
import { ForbiddenException } from "@nestjs/common";
import { GetAllUserOptionQuery } from "./get-all-user-option.command";

// import { Event } from "@/domain/entities/event";

@QueryHandler(GetAllUserOptionQuery)
export class GetAllUserOptionsHandler implements IQueryHandler<GetAllUserOptionQuery> {
  constructor(
    private readonly profileRepository: ProfileRepositoryOrm,
    ) {}

  async execute(query: GetAllUserOptionQuery): Promise<any> {
    const { pageOptionsDto } = query
    try{
      const users = await this.profileRepository.findAllOptions(pageOptionsDto);
      return users

    }catch(error){
      throw new ForbiddenException();
    }
    // return new GetAllUserResponse(users);
  }
}