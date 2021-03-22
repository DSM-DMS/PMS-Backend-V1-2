import { BadRequestException, Injectable } from '@nestjs/common';
import { ClubInfoResObj } from './club.dto';
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
}
