
import { UserM } from "@/domain/model/user.model";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
        configService: ConfigService,
        private readonly userRepository : UserRepositoryOrm
        ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate(payload: UserM){
        const user = await this.userRepository.findById(payload.id)

        if(!user){
            throw new UnauthorizedException({message: "Don't have account "})
        }
        return payload
    }
}