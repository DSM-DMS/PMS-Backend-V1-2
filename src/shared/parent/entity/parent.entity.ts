import { Column, Entity, PrimaryColumn } from "typeorm";
import { Parent } from "../interface";

@Entity("users")
export class ParentEntity implements Parent {
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
