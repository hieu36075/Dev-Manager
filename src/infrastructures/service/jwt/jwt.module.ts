import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    Jwt.registerAsync({
      useFactory: (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
    
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtModule {}