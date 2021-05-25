import { EntityRepository, Repository } from "typeorm";
import { ClubList } from "../dto/club.dto";
import { Club } from "./club.entity";

@EntityRepository(Club)
export class ClubRepository extends Repository<Club> {
  public getClubInfo(name: string): Promise<Club> {
    return this.createQueryBuilder("club")
      .select("club.title", "title")
      .addSelect(`CONCAT('${process.env.DDYZD_URL}/file/', club.uri)`, "uri")
      .addSelect("club.explanation", "explanation")
      .where("club.title = :name", { name })
      .getRawOne();
  }

  public async getClubMemberAll(club_name: string): Promise<string[]> {
    const members = await this.createQueryBuilder("club")
      .select("club.title")
      .addSelect("GROUP_CONCAT(user.name)", "members")
      .leftJoin("club.club_member", "club_member")
      .leftJoin("club_member.user", "user")
      .groupBy("club.title")
      .having("club.title = :club_name", { club_name })
      .getRawOne();
    return members.members.split(",");
  }

  public getClubList(): Promise<ClubList[]> {
    return this.createQueryBuilder("club")
      .select("club.title", "club-name")
      .addSelect("club.explanation", "explanation")
      .addSelect(
        `CONCAT('${process.env.DDYZD_URL}/file/', club.uri)`,
        "picture-uri",
      )
      .getRawMany();
  }
}
