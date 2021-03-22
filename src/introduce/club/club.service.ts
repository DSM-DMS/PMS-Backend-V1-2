import { BadRequestException, Injectable } from '@nestjs/common';
import { ClubInfoResObj, ClubListResObj } from './club.dto';
import { ClubRepository } from './entity/club.repository';

@Injectable()
export class ClubService {
  constructor(
    private clubRepository: ClubRepository
  ) {}

  public async getClubInfo(name: string): Promise<ClubInfoResObj> {
    const clubInfo: ClubInfoResObj = await this.clubRepository.getClubInfo(name);
    if(!clubInfo) {
      throw new BadRequestException("Not Fount Club Info");
    }
    clubInfo.member = await this.clubRepository.getClubMemberAll(name);
    return clubInfo;
  }

  public async getClubList(): Promise<ClubListResObj> {
    const clubList: ClubListResObj = {
      clubs: await this.clubRepository.getClubList()
    };
    return clubList;
  }
}
