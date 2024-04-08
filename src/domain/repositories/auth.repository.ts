import { Tokens } from "../common/types/tokens.types";
import { LoginDTO } from "../dto/auth/login.dto";


export interface IAuthRepository{
    login(loginDTO: LoginDTO) : Promise<Tokens>
}