// get-all-users-query.handler.ts
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProfileRepositoryOrm } from "@/infrastructures/repositories/profile/profile.repository";
import { ForbiddenException } from "@nestjs/common";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { GetUserByIdQuery } from "./get-user-by-id.command";


@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    private readonly userRepository: UserRepositoryOrm,
    ) {}

  async execute(query: GetUserByIdQuery): Promise<any> {
    const {id} = query
    try{
      const users = await this.userRepository.findById(id);
      return users

    }catch(error){
      throw new ForbiddenException();
    }
    // return new GetAllUserResponse(users);
  }
}