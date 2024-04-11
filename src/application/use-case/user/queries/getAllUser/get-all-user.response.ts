import { ProfileM } from "@/domain/model/profile.model";


export class GetAllUserResponse {
  profiles: ProfileM[];

  constructor(profile: ProfileM[]) {
    this.profiles = profile
  }
}
