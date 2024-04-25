import { RepositoriesModule } from "@/infrastructures/repositories/repository.module";

import { JwtStrategy } from "@/application/common/strategies/jwt.strategy";
import { LoginCommand } from "@/application/use-case/auth/command/login/login.command";
import { LoginHandler } from "@/application/use-case/auth/command/login/login.handler";
import { GenerateCVQuery } from "@/application/use-case/file/query/generate-cv.command";
import { GenerateCVQueryHandler } from "@/application/use-case/file/query/generate-cv.handler";
import { CreateLanguageCommand } from "@/application/use-case/language/command/create-language/create-language.command";
import { CreateLanguageHandler } from "@/application/use-case/language/command/create-language/create-languale.handler";
import { DeleteLanguageCommand } from "@/application/use-case/language/command/delete-language/delete-laguage.handler";
import { DeleteLanguageHandler } from "@/application/use-case/language/command/delete-language/delete-language.command";
import { UpdateLanguageHandler } from "@/application/use-case/language/command/update-language/update-language.command";
import { UpdateLanguageCommand } from "@/application/use-case/language/command/update-language/update-language.handler";
import { GetAllLanguageQuery } from "@/application/use-case/language/query/get-all-language/get-all-language.command";
import { GetAllLanguageQueryHandler } from "@/application/use-case/language/query/get-all-language/get-all-language.handler";
import { GetMostLanguageQuery } from "@/application/use-case/language/query/getMostLanguage/get-most-language.command";
import { GetMostLanguageHandler } from "@/application/use-case/language/query/getMostLanguage/get-most-language.handler";
import { CreateLanguageMemberCommand } from "@/application/use-case/languageMember/command/create-languageMember/create-languageMember.command";
import { CreateLanguageMemberHandler } from "@/application/use-case/languageMember/command/create-languageMember/create-languageMember.handler";
import { DeleteLanguageMemberCommand } from "@/application/use-case/languageMember/command/delete-languageMember/delete-languageMember.command";
import { DeleteLanguageMemberHandler } from "@/application/use-case/languageMember/command/delete-languageMember/delete-languageMember.handler";
import { UpdateLanguageMemberCommand } from "@/application/use-case/languageMember/command/update-languageMember/update-languageMember.command";
import { UpdateLanguageMemberHandler } from "@/application/use-case/languageMember/command/update-languageMember/update-languageMember.handler";
import { CreatePositionCommand } from "@/application/use-case/position/command/create-position/create-position.command";
import { CreatePositionHandler } from "@/application/use-case/position/command/create-position/create-position.handler";
import { DeletePositionCommand } from "@/application/use-case/position/command/delete-postion/delete-position.command";
import { DeletePositionHandler } from "@/application/use-case/position/command/delete-postion/delete-postion.handler";
import { UpdatePositionCommand } from "@/application/use-case/position/command/update-position/update-position.command";
import { UpdatePositionHandler } from "@/application/use-case/position/command/update-position/update-position.handler";
import { GetAllPostionQuery } from "@/application/use-case/position/queries/get-all-position/get-all-position.command";
import { GetAllPositionHandler } from "@/application/use-case/position/queries/get-all-position/get-all-position.handler";
import { AddUserProjectCommand } from "@/application/use-case/project/command/add-user-project/add-user-project.command";
import { AddUserProjectHandler } from "@/application/use-case/project/command/add-user-project/add-user-project.handler";
import { CreateProjectCommand } from "@/application/use-case/project/command/create-project/create-project.command";
import { CreateProjectHandler } from "@/application/use-case/project/command/create-project/create-project.handler";
import { DeleteEmployeeProjectCommand } from "@/application/use-case/project/command/delete-employee/delete-employee.command";
import { DeleteEmployeeProjectHandler } from "@/application/use-case/project/command/delete-employee/delete-employee.handler";
import { DeleteProjectCommand } from "@/application/use-case/project/command/delete-project/delete-project.command";
import { DeleteProjectHandler } from "@/application/use-case/project/command/delete-project/delete-project.handler";
import { UpdateProjectCommand } from "@/application/use-case/project/command/update-project/update-project.command";
import { UpdateProjectHandler } from "@/application/use-case/project/command/update-project/update-project.handler";
import { GetAllProjectQuery } from "@/application/use-case/project/queries/get-all-project/get-all-project.command";
import { GetAllProjectQueryHandler } from "@/application/use-case/project/queries/get-all-project/get-all-project.handler";
import { GetProjectByIdQuery } from "@/application/use-case/project/queries/get-project-by-id/get-project-by-id.command";
import { GetProjectByIdQueryHandler } from "@/application/use-case/project/queries/get-project-by-id/get-project-by-id.handler";
import { GetMostTechnicalQuery } from "@/application/use-case/project/queries/getMostTechnical/get-most-technical.command";
import { GetMostTechnicalHandler } from "@/application/use-case/project/queries/getMostTechnical/get-most-technical.handler";
import { CreateTechnicalCommand } from "@/application/use-case/technical/command/create-technical/create-technical.command";
import { CreateTechnicalHandler } from "@/application/use-case/technical/command/create-technical/create-technical.handler";
import { DeleteTechnicalCommand } from "@/application/use-case/technical/command/delete-technical/delete-technical.command";
import { DeleteTechnicalHandler } from "@/application/use-case/technical/command/delete-technical/delete-technical.handler";
import { UpdateTechnicalCommand } from "@/application/use-case/technical/command/update-technical/update-technical.command";
import { UpdateTechnicalHandler } from "@/application/use-case/technical/command/update-technical/update-technical.handler";
import { GetAllTechnicalQuery } from "@/application/use-case/technical/queries/get-all-technical/get-all-technical.command";
import { GetAllTechnicalHandler } from "@/application/use-case/technical/queries/get-all-technical/get-all-technical.handler";
import { GetProjectInMonthQuery } from "@/application/use-case/technical/queries/getProjectInMonth/get-project-in-month.command";
import { CreateTechnicalMemberCommand } from "@/application/use-case/technicalMember/command/create-technical/create-technicalMember.command";
import { CreateTechnicalMemberHandler } from "@/application/use-case/technicalMember/command/create-technical/create-technicalMember.handler";
import { DeleteTechnicalMemberCommand } from "@/application/use-case/technicalMember/command/delete-technical/delete-technical.command";
import { DeleteTechnicalMemberHandler } from "@/application/use-case/technicalMember/command/delete-technical/delete-technical.handler";
import { CreateAccountCommand } from "@/application/use-case/user/command/createUser/create-account.command";
import { CreateAccountHandler } from "@/application/use-case/user/command/createUser/create-account.handler";
import { DeleteAccountCommand } from "@/application/use-case/user/command/deleteUser/delete-account.command";
import { DeleteAccountHandler } from "@/application/use-case/user/command/deleteUser/delete-account.handler";
import { UpdateProfileCommand } from "@/application/use-case/user/command/updateProfile/update-profile.command";
import { UpdateProfileHandler } from "@/application/use-case/user/command/updateProfile/update-profile.handler";
import { GetAllProfileEmployeeQuery } from "@/application/use-case/user/queries/getAllEmployee/get-all-employee.command";
import { GetAllProfileEmployeeHandler } from "@/application/use-case/user/queries/getAllEmployee/get-all-employee.handler";
import { GetAllUserQuery } from "@/application/use-case/user/queries/getAllUser/get-all-user.command";
import { GetAllUserHandler } from "@/application/use-case/user/queries/getAllUser/get-all-user.handler";
import { GetAllUserOptionQuery } from "@/application/use-case/user/queries/getAllUserOption/get-all-user-option.command";
import { GetAllUserOptionsHandler } from "@/application/use-case/user/queries/getAllUserOption/get-all-user-option.handler";
import { GetUserByIdQuery } from "@/application/use-case/user/queries/getUserById/get-user-by-id.command";
import { GetUserByIdHandler } from "@/application/use-case/user/queries/getUserById/get-user-by-id.handler";
import { GetUserWithoutProjectQuery } from "@/application/use-case/user/queries/getUserWithoutProjects/getUserWithoutProject.command";
import { GetUserWithougtProjectHandler } from "@/application/use-case/user/queries/getUserWithoutProjects/getUserWithoutProject.handler";
import { BcryptModule } from "@/infrastructures/service/bcrypt/bcrypt.module";
import { CloudinaryModule } from "@/infrastructures/service/cloudinary/cloudinary.module";
import { DocxtemplateModule } from "@/infrastructures/service/docxtemplate/docxtemplate.module";
import { JwtModule } from "@/infrastructures/service/jwt/jwt.module";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthController } from "./auth/auth.controller";
import { FileController } from "./file/file.controller";
import { LanguageController } from "./language/language.controller";
import { LanguageMemberController } from "./languageMember/languageMember.controller";
import { PositionController } from "./position/position.controller";
import { ProjectController } from "./project/project.controller";
import { TechnicalController } from "./technical/technical.controller";
import { TechnicalMemberController } from "./technicalMember/technicalMember.controller";
import { UserController } from "./user/user.controller";
import { GetAllTechnicalPaginationQuery } from "@/application/use-case/technical/queries/get-all-technical-pagination/get-all-technical.command";
import { GetAllTechnicalPaginationHandler } from "@/application/use-case/technical/queries/get-all-technical-pagination/get-all-technical.handler";
import { GetAllPostionPaginationQuery } from "@/application/use-case/position/queries/get-all-postion-pagination/get-all-postion-pagination.command";
import { GetAllPaginationPositionHandler } from "@/application/use-case/position/queries/get-all-postion-pagination/get-all-postion-pagination.handler";
import { GetAllLanguagePaginationQuery } from "@/application/use-case/language/query/get-all-language-pagination/get-all-language-pagination.command";
import { GetAllLanguagePaginationQueryHandler } from "@/application/use-case/language/query/get-all-language-pagination/get-all-language-pagination.handler";


const CommandHandler = [
    //usser
    CreateAccountCommand,
    CreateAccountHandler,
    //auth
    LoginCommand,
    LoginHandler,
    //project
    CreateProjectCommand,
    CreateProjectHandler,
    UpdateProjectCommand,
    UpdateProjectHandler,
    //position
    CreatePositionCommand,
    CreatePositionHandler,
    UpdatePositionCommand,
    UpdatePositionHandler,
    DeletePositionCommand,
    DeletePositionHandler,
    //technical
    CreateTechnicalCommand,
    CreateTechnicalHandler,
    UpdateTechnicalCommand,
    UpdateTechnicalHandler,
    DeleteTechnicalCommand,
    DeleteTechnicalHandler,


    AddUserProjectCommand,
    AddUserProjectHandler,

    //language
    CreateLanguageCommand,
    CreateLanguageHandler,
    UpdateLanguageCommand,
    UpdateLanguageHandler,
    DeleteLanguageCommand,
    DeleteLanguageHandler,

    //acount
    DeleteAccountCommand,
    DeleteAccountHandler,
    DeleteProjectCommand,
    DeleteProjectHandler,
    DeleteEmployeeProjectCommand,
    DeleteEmployeeProjectHandler,
    UpdateProfileCommand,
    UpdateProfileHandler,
    // Language Member
    CreateLanguageMemberCommand,
    CreateLanguageMemberHandler,
    DeleteLanguageMemberCommand,
    DeleteLanguageMemberHandler,
    UpdateLanguageMemberCommand,
    UpdateLanguageMemberHandler,
    //Tehnical Member
    CreateTechnicalMemberCommand,
    CreateTechnicalMemberHandler,
    DeleteTechnicalMemberCommand,
    DeleteTechnicalMemberHandler,
    UpdateLanguageMemberCommand,
    UpdateLanguageMemberHandler
  ]

const QueryHandler = [
    GetAllUserQuery,
    GetAllUserHandler,
    GetAllProjectQuery,
    GetAllProjectQueryHandler,
    GetAllPostionQuery,
    GetAllPositionHandler,
    GetAllTechnicalQuery,
    GetAllTechnicalHandler,
    GetAllProfileEmployeeHandler,
    GetAllProfileEmployeeQuery,
    GetAllUserOptionQuery, 
    GetAllUserOptionsHandler,
    GetAllLanguageQuery,
    GetAllLanguageQueryHandler,
    GetProjectByIdQuery,
    GetProjectByIdQueryHandler,
    GenerateCVQuery,
    GenerateCVQueryHandler,
    GetUserByIdHandler,
    GetUserByIdQuery,
    GetProjectInMonthQuery,
    GetUserWithougtProjectHandler,
    GetUserWithoutProjectQuery,
    GetMostLanguageQuery, 
    GetMostLanguageHandler,
    GetMostTechnicalQuery, 
    GetMostTechnicalHandler,
    GetAllTechnicalPaginationQuery,
    GetAllTechnicalPaginationHandler,
    GetAllPostionPaginationQuery,
    GetAllPaginationPositionHandler,
    GetAllLanguagePaginationQuery, 
    GetAllLanguagePaginationQueryHandler

]



@Module({
    imports: [
        CqrsModule,
        RepositoriesModule,
        BcryptModule,
        JwtModule,
        CloudinaryModule,
        DocxtemplateModule
    ],
    controllers: [
        UserController,
        AuthController,
        ProjectController,
        FileController,
        PositionController,
        TechnicalController,
        LanguageController,
        LanguageMemberController,
        TechnicalMemberController
    ],
    providers: [
        ...CommandHandler,
        ...QueryHandler,
        JwtStrategy,

    ],
})
export class PresentationModule { }
