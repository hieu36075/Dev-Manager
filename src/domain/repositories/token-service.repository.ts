import { Tokens } from "../common/types/tokens.types";


export interface ITokenRepository{
    generatedToken(): Promise<Tokens>;
}