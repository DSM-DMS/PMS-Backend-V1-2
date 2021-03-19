import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class Parent {
  @PrimaryColumn()
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  user_role: string;

  @Column({ nullable: true })
  provider: string; 
}