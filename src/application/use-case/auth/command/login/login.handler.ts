import { Tokens } from '@/application/common/types/tokens.types';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user/user.repository';
import { BcryptService } from '@/infrastructures/service/bcrypt/bcrypt.service';
import { JwtTokenService } from '@/infrastructures/service/jwt/jwt.service';
import { ForbiddenException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly userRepository: UserRepositoryOrm,
    private readonly jwtService: JwtTokenService,
    private readonly bcryptService: BcryptService,
  ) {}
  async execute(command: LoginCommand): Promise<Tokens> {
    const { email, password } = command;
    try {
      const user = await this.userRepository.getUserByEmail(email);
      if (!user.role) {
        throw new ForbiddenException('Please check account');
      }
      const verifyPassword = await this.bcryptService.compare(
        password,
        user.password,
      );
      if (!verifyPassword) {
        throw new ForbiddenException('Please check again');
      }
      return await this.jwtService.createToken({
        id: user.id,
        username: user.userName,
        role: user.role.name,
      });
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
