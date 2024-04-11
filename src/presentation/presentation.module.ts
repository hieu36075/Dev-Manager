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

import { FileController } from "./file/file.controller";
import { CloudinaryModule } from "@/infrastructures/service/cloudinary/cloudinary.module";
import { GetAllPostionQuery } from "@/application/use-case/position/queries/get-all-position/get-all-position.command";
import { GetAllPositionHandler } from "@/application/use-case/position/queries/get-all-position/get-all-position.handler";
import { CreatePositionCommand } from "@/application/use-case/position/command/create-position/create-position.command";
import { CreatePositionHandler } from "@/application/use-case/position/command/create-position/create-position.handler";
import { PositionController } from "./position/position.controller";
import { CreateSkillCommand } from "@/application/use-case/skill/command/create-skill/create-skill.command";
import { CreateSkillHandler } from "@/application/use-case/skill/command/create-skill/create-skill.handler";
import { GetAllSkillQuery } from "@/application/use-case/skill/queries/get-all-skill/get-all-skill.command";
import { GetAllSkillHandler } from "@/application/use-case/skill/queries/get-all-skill/get-all-skill.handler";
import { SkillController } from "./skill/skill.controller";
import { GetAllProjectQuery } from "@/application/use-case/project/queries/get-all-project/get-all-project.command";
import { GetAllProjectQueryHandler } from "@/application/use-case/project/queries/get-all-project/get-all-project.handler";
import { AddUserProjectCommand } from "@/application/use-case/project/command/add-user-project/add-user-project.command";
import { AddUserProjectHandler } from "@/application/use-case/project/command/add-user-project/add-user-project.handler";
import { GetAllProfileEmployeeHandler } from "@/application/use-case/user/queries/getAllEmployee/get-all-employee.handler";
import { GetAllProfileEmployeeQuery } from "@/application/use-case/user/queries/getAllEmployee/get-all-employee.command";


const CommandHandler = [
    CreateAccountCommand,
    CreateAccountHandler,
    LoginCommand,
    LoginHandler,
    CreateProjectCommand,
    CreateProjectHandler,
    UpdateProjectCommand,
    UpdateProjectHandler,
    CreatePositionCommand,
    CreatePositionHandler,
    CreateSkillCommand,
    CreateSkillHandler,
    AddUserProjectCommand,
    AddUserProjectHandler
  ]

const QueryHandler = [
    GetAllUserQuery,
    GetAllUserHandler,
    GetAllProjectQuery,
    GetAllProjectQueryHandler,
    GetAllPostionQuery,
    GetAllPositionHandler,
    GetAllSkillQuery,
    GetAllSkillHandler,
    GetAllProfileEmployeeHandler,
    GetAllProfileEmployeeQuery
]

@Module({
    imports: [
        CqrsModule,
        RepositoriesModule,
        BcryptModule,
        JwtModule,
        CloudinaryModule,
    ],
    controllers: [
        UserController,
        AuthController,
        ProjectController,
        FileController,
        PositionController,
        SkillController
    ],
    providers: [
        ...CommandHandler,
        ...QueryHandler,
        JwtStrategy,

    ],
})
export class PresentationModule { }
