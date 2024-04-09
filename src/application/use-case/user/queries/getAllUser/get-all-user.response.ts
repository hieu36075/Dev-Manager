import { UserM } from "@/domain/model/user.model";

export class GetAllUserResponse {
  users: UserM[];

  constructor(users: UserM[]) {
    this.users = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        password: '', 
      };
    });
  }
}
