import { UserM } from "./user.model";

export class RoleM{
    id: string;
    name: string;
    users: UserM[]
}