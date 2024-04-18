import { PageMetaDto } from "@/application/dto/pagination/pageMeta.dto";
import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import { PageDto } from "@/application/dto/pagination/responsePagination";
import { CreateProjectDTO } from "@/application/dto/project/create-project.dto";
import { UpdateProjectDTO } from "@/application/dto/project/update-project.dto";
import { ProjectM } from "@/domain/model/project.model";
import { IProjectRepository } from "@/domain/repositories/project.repository";
import { Project } from "@/infrastructures/entities/project.enity";
import { ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { parseISO } from "date-fns";
import { EntityManager, Like, Repository } from "typeorm";

export class ProjectRepositoryOrm implements IProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {

  }
  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<ProjectM>> {
    const { name, page, take, orderBy } = pageOptionsDto;
    const takeData = take || 10;
    const skip = (page - 1) * take;
    const [result, total] = await this.projectRepository.findAndCount({
      where: {
        name: name ? Like(`%${name}%`) : Like(`%%`),
      },
      // relations: ['projectMembers', 'projectMembers.user', 'projectMembers.user.profile', 'projectMembers.user.manager'],
      relations: {
        projectMembers: {

          user: {
            profile: true,
            manager: true
          },
          roles: {
            position: true
          },

        }
      },
      select: {
        projectMembers: {
          id: true,
          roles: {
            id: true,
            // name:true,
            position: {
              name: true
            }
          },
          user: {
            isManager: true,
            managerId: true,
            profile: {
              fullName: true,
              phoneNumber: true,
              email: true,
              dayOfBirth: true,
              avatarUrl: true,
              gender: true,
              status: true
            },
            manager: {
              userName: true
            },

          }
        }
      },
      order: {
        startDate: orderBy,
      },
      skip: skip,
      take: takeData,
    });


    const pageMetaDto = new PageMetaDto(pageOptionsDto, total);
    return new PageDto<ProjectM>(result, pageMetaDto, 'Success');
  }

  async findById(id: string): Promise<ProjectM> {
    if (!id) {
      throw new ForbiddenException('Not have Id')
    }
    const project = await this.projectRepository.findOne({
      where: {
        id: id
      },
      relations: {
        user: {
          profile: true
        },
        projectMembers: {
          roles: {
            position: true
          },
          user: {
            profile: true,
            role: false,
            manager: {
              profile: true
            },

          }
        }
      },
      select: {
        user: {
          id: true,
          email: true,
          profile: {
            fullName: true,
            avatarUrl: true
          }

        },
        projectMembers: {
          id: true,
          roles: {
            id: true,
            position: {
              name: true
            }
            // name:true,
          },
          user: {
            userName: true,
            isManager: true,
            managerId: true,
            manager: {
              userName: true,
              profile: {
                fullName: true,
                avatarUrl: true,
                email: true
              }
            },
            // role: {
            //   id: true,
            //   name: true,
            //   // users: {
            //   //   userName: 
            //   // }
            // },
            profile: {
              fullName: true,
              email: true,
              avatarUrl: true,
            },

          },


        }
      }
    })

    return project
  }
  async create(createProjectDTO: CreateProjectDTO, manager: EntityManager): Promise<ProjectM> {
    const project = new Project
    project.name = createProjectDTO.name
    project.description = createProjectDTO.description
    project.startDate = parseISO(createProjectDTO.startDate);
    project.endDate = parseISO(createProjectDTO.endDate);
    project.user = createProjectDTO.user
    return await manager.save(project)
  }


  async update(id: string, updateProjectDTO: UpdateProjectDTO): Promise<ProjectM> {
    const projectToUpdate = await this.findById(id);
    if (!projectToUpdate) {
      throw new Error('Project not found');
    }
    for (const [key, value] of Object.entries(updateProjectDTO)) {
      if (value !== undefined && value !== null) {
        if (key === 'startDate' || key === 'endDate') {
          projectToUpdate[key] = parseISO(value);
        } else {
          projectToUpdate[key] = value;
        }
      }
    }

    return await this.projectRepository.save(projectToUpdate)
  }

  async delete(id: string): Promise<void> {

  }
}