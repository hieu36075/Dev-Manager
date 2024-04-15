import { IJwtService, IJwtServicePayload } from '@/domain/adapter/token-service.repository';
import { Tokens } from '@/application/common/types/tokens.types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private configService : ConfigService
  ) {}

  async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  async createToken(payload: IJwtServicePayload): Promise<Tokens> {
    const at= this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '7d',
    });
    return {
      access_token: at,
    }
  }
}