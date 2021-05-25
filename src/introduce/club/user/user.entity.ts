import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClubMember } from "../entity/club.member.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 15 })
  name: string;

  @OneToMany((type) => ClubMember, (member) => member.club)
  club_member: ClubMember[];
}
