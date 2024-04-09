import { RepositoriesModule } from "@/infrastructures/repositories/repository.module";

import { CreateAccountCommand } from "@/application/use-case/user/command/createUser/create-account.command";
import { CreateAccountHandler } from "@/application/use-case/user/command/createUser/create-account.handler";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { UserController } from "./user/user.controller";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { BcryptModule } from "@/infrastructures/service/bcrypt/bcrypt.module";
import { JwtModule } from "@/infrastructures/service/jwt/jwt.module";
import { LoginCommand } from "@/application/use-case/auth/command/login/login.command";
import { LoginHandler } from "@/application/use-case/auth/command/login/login.handler";
import { AuthController } from "./auth/auth.controller";
import { GetAllUserQuery } from "@/application/use-case/user/queries/getAllUser/get-all-user.command";
import { GetAllUserHandler } from "@/application/use-case/user/queries/getAllUser/get-all-user.handler";

const CommandHandler = [
    CreateAccountCommand,
    CreateAccountHandler,
    LoginCommand,
    LoginHandler
  ]

const QueryHandler = [
    GetAllUserQuery,
    GetAllUserHandler
]

@Module({
    imports: [
        CqrsModule,
        RepositoriesModule,
        BcryptModule,
        JwtModule,
    ],
    controllers: [
        UserController,
        AuthController
    ],
    providers: [
        ...CommandHandler,
        ...QueryHandler
    ],
})
export class PresentationModule { }
