import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Club } from "./club.entity";

@Entity("club_member")
export class ClubMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.club_member)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(type => Club, club => club.club_member)
  @JoinColumn({ name: "club_id" })
  club: Club;
}