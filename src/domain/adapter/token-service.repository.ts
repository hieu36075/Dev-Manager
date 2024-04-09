import { Tokens } from "../../application/common/types/tokens.types";

export interface IJwtServicePayload {
  id: string;
  username: string;
  role: string;

}

export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(payload: IJwtServicePayload): Promise<Tokens>;
}