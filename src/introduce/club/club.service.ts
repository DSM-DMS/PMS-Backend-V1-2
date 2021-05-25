import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubInfoResponse } from "./dto/response/club-info.response";
import { ClubListResponse } from "./dto/response/club-list.response";
import { ClubRepository } from "./entity/club.repository";

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubRepository, "ddyzdConnection")
    private clubRepository: ClubRepository,
  ) {}

  public async getClubInfo(name: string): Promise<ClubInfoResponse> {
    const clubInfo: ClubInfoResponse = await this.clubRepository.getClubInfo(
      name,
    );
    if (!clubInfo) {
      throw new BadRequestException("Not Fount Club Info");
    }
    clubInfo.member = await this.clubRepository.getClubMemberAll(name);
    return clubInfo;
  }

  public async getClubList(): Promise<ClubListResponse> {
    const clubList: ClubListResponse = {
      clubs: await this.clubRepository.getClubList(),
    };
    return clubList;
  }
}
