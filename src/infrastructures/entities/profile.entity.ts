import { GenderEnum } from '@/application/common/enums/gender.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Skill } from './skill.entity';
import { Position } from './position.entity';
import { ProfileStatusEnum } from '@/application/common/enums/profile-status.enum';

@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index({ unique: true })
    @Column('varchar')
    fullName: string;

    @Column('varchar')
    phoneNumber: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    dayOfBirth: string;

    @Column({
        type: 'enum',
        enum: GenderEnum,
        default: GenderEnum.OTHER
    })
    gender: GenderEnum;

    @Column({
        type: 'enum',
        enum: ProfileStatusEnum,
        default: ProfileStatusEnum.ACTIVE
    })
    status: ProfileStatusEnum;


    @OneToMany(() => Skill, skill => skill.profile)
    skills: Skill[];

    @OneToMany(() => Position, position => position.profile)
    positions: Position[];

    @Column('varchar')
    description: string
}