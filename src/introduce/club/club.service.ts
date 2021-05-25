import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubInfoResObj, ClubListResObj } from "./dto/club.dto";
import { ClubRepository } from "./entity/club.repository";

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubRepository, "ddyzdConnection")
    private clubRepository: ClubRepository,
  ) {}

  public async getClubInfo(name: string): Promise<ClubInfoResObj> {
    const clubInfo: ClubInfoResObj = await this.clubRepository.getClubInfo(
      name,
    );
    if (!clubInfo) {
      throw new BadRequestException("Not Fount Club Info");
    }
    clubInfo.member = await this.clubRepository.getClubMemberAll(name);
    return clubInfo;
  }

  public async getClubList(): Promise<ClubListResObj> {
    const clubList: ClubListResObj = {
      clubs: await this.clubRepository.getClubList(),
    };
    return clubList;
  }
}
