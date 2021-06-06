import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParentModule } from "../shared/parent/parent.module";
import { CommentRepository } from "./comment/comment.repository";
import { NoticeRepository } from "./entity/notice.repository";
import { NoticeController } from "./notice.controller";
import { NoticeService } from "./notice.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([NoticeRepository, CommentRepository]),
    ParentModule,
  ],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
