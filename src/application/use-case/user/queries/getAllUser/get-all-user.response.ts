import { ProfileM } from "@/domain/model/profile.model";


export class GetAllUserResponse {
  users: ProfileM[];

  constructor(users: ProfileM[]) {
    this.users = users
  }
}
