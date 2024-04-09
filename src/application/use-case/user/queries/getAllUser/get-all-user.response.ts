import { UserM } from "@/domain/modal/user.modal";

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
