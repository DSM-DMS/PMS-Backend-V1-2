import { Module } from '@nestjs/common';
import { IntroduceController } from './introduce.controller';
import { ClubService } from './club/club.service';
import { CompanyService } from './company/company.service';

@Module({
  controllers: [IntroduceController],
  providers: [ClubService, CompanyService]
})
export class IntroduceModule {}
