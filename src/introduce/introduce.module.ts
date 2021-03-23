import { Module } from '@nestjs/common';
import { IntroduceController } from './introduce.controller';
import { ClubService } from './club/club.service';
import { CompanyService } from './company/company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubRepository } from './club/entity/club.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClubRepository], "ddyzdConnection")],
  controllers: [IntroduceController],
  providers: [ClubService, CompanyService]
})
export class IntroduceModule {}
