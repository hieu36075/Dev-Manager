import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn } from 'typeorm';
import { PositionM } from './position.model';
import { ProjectMemberM } from './projectMember.model';



export class RoleMemberProjectM {
    id: string;
    position: PositionM;
    projectMember: ProjectMemberM;

}
