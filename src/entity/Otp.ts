import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  otp: number;

  @Column()
  email: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
