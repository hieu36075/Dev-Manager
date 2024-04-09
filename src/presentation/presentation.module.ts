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
import { CreateProjectCommand } from "@/application/use-case/project/command/create-project/create-project.command";
import { CreateProjectHandler } from "@/application/use-case/project/command/create-project/create-project.handler";
import { ProjectController } from "./project/project.controller";
import { JwtStrategy } from "@/application/common/strategies/jwt.strategy";
import { UpdateProjectCommand } from "@/application/use-case/project/command/update-project/update-project.command";
import { UpdateProjectHandler } from "@/application/use-case/project/command/update-project/update-project.handler";
import { GetAllProjectQuery } from "@/application/use-case/project/queries/get-all-project/get-all-project.handler";
import { GetAllProjectQueryHandler } from "@/application/use-case/project/queries/get-all-project/get-all-project.command";


const CommandHandler = [
    CreateAccountCommand,
    CreateAccountHandler,
    LoginCommand,
    LoginHandler,
    CreateProjectCommand,
    CreateProjectHandler,
    UpdateProjectCommand,
    UpdateProjectHandler
  ]

const QueryHandler = [
    GetAllUserQuery,
    GetAllUserHandler,
    GetAllProjectQuery,
    GetAllProjectQueryHandler
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
        AuthController,
        ProjectController
    ],
    providers: [
        ...CommandHandler,
        ...QueryHandler,
        JwtStrategy
    ],
})
export class PresentationModule { }
