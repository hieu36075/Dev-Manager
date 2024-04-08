import { LoginDTO } from "@/application/dto/auth/login.dto";
import { Tokens } from "../../application/common/types/tokens.types";



export interface IAuthRepository{
    login(loginDTO: LoginDTO) : Promise<Tokens>
}