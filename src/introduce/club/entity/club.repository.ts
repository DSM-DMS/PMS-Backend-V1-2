import { EntityRepository, Repository } from "typeorm";
import { Club } from "./club.entity";

@EntityRepository(Club)
export class ClubRepository extends Repository<Club> {
  public getClubInfo(name: string): Promise<Club> {
    return this.createQueryBuilder("club")
    .select("title")
    .addSelect(`CONCAT('${process.env.DDYZD_URL}/file/', uri)`, "uri")
    .addSelect("explanation")
    .where("title :name", { name })
    .getRawOne();
  }
}