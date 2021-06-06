import { EntityRepository, Repository } from "typeorm";
import { Comment } from "./comment.entity";

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  public findAllByNotice(notice_id: number): Promise<Comment[]> {
    return this.createQueryBuilder("comment")
      .select("comment.id")
      .addSelect("comment.upload-date")
      .addSelect("comment.body")
      .addSelect("user.email")
      .addSelect("user.name")
      .addSelect("user.user_role")
      .leftJoin("comment.user", "user")
      .leftJoin("comment.notice", "notice")
      .where("notice.id = :id", { id: notice_id })
      .andWhere("comment.depth = 0")
      .orderBy("comment.upload-date")
      .getMany();
  }

  public async getLargeComment(comment_id: number): Promise<Comment[]> {
    const comment: Comment = await this.createQueryBuilder("comment")
      .select("comment.id")
      .addSelect("large_comment.id")
      .addSelect("large_comment.upload-date")
      .addSelect("large_comment.body")
      .addSelect("user.email")
      .addSelect("user.name")
      .addSelect("user.user_role")
      .leftJoin("comment.comment", "large_comment")
      .leftJoin("large_comment.user", "user")
      .where("comment.id = :id", { id: comment_id })
      .andWhere("large_comment.depth = comment.depth + 1")
      .orderBy("comment.upload-date")
      .getOne();
    return comment.comment;
  }
}
