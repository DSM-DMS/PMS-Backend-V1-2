import { EntityRepository, Repository } from "typeorm";
import { Club } from "./club.entity";
import { ClubInfoResObj } from "../club.dto";

@EntityRepository(Club)
export class ClubRepository extends Repository<Club> {
  public getClubInfo(name: string): Promise<ClubInfoResObj> {
    return this.createQueryBuilder("club")
    .select("name", "title")
    .addSelect("profile_image", "uri")
    .addSelect("description", "explanation")
    .where("title :name", { name })
    .getRawOne();
  }
}