import { EntityRepository, Repository } from "typeorm";
import { Club } from "./club.entity";

@EntityRepository(Club)
export class ClubRepository extends Repository<Club> {
  public getClubInfo(name: string): Promise<Club> {
    return this.createQueryBuilder("club")
    .select("title")
    .addSelect(`CONCAT('${process.env.DDYZD_URL}/file/', uri)`, "uri")
    .addSelect("explanation")
    .where("title = :name", { name })
    .getRawOne();
  }

  public async getClubMemberAll(club_name: string): Promise<string[]> {
    const members = await this.createQueryBuilder("club")
    .select("title")
    .addSelect("GROUP_CONCAT(user.name)", "members")
    .leftJoin("club.club_member", "club_member")
    .leftJoin("club_member.user", "user")
    .groupBy("title")
    .having("title = :club_name", { club_name })
    .getRawOne();
    return members.members.split(",");
  }
}