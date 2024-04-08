import { User } from "@/infrastructures/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
        configService: ConfigService,

        ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }
    // async validate(payload: {sub: number; email: string}) {        
    //     const user = await this.prismaService.user.findUnique({
    //         where: {
    //             id: payload.sub
    //         }
    //     })
    //     delete user.hashedPassword
    //     return user;
    //   }

    async validate(payload: User){
        return payload
    }
}