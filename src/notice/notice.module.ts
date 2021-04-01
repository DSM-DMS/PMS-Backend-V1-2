import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeRepository } from './entity/notice.repository';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeRepository])],
  controllers: [NoticeController],
  providers: [NoticeService]
})
export class NoticeModule {}
