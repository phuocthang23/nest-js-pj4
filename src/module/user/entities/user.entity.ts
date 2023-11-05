import { Exclude } from 'class-transformer';
import { Role } from 'src/module/role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    nullable: false,
  })
  avatar: string;

  @Column({ type: 'int', default: 0, nullable: true })
  status: number;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updateAt: Date;

  @Column({ default: 2, nullable: false })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
