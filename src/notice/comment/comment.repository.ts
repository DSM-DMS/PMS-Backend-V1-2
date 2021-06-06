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
      .orderBy("comment.upload-date", "DESC")
      .getMany();
  }

  public async findAllLargeComment(comment: Comment): Promise<Comment[]> {
    return this.createQueryBuilder("comment")
      .select("comment.id")
      .addSelect("comment.upload-date")
      .addSelect("comment.body")
      .addSelect("user.email")
      .addSelect("user.name")
      .addSelect("user.user_role")
      .leftJoin("comment.user", "user")
      .leftJoin("comment.parent_comment", "parent_comment")
      .where("parent_comment.id = :id", { id: comment.id })
      .andWhere("comment.depth = :depth", { depth: comment.depth + 1 })
      .orderBy("comment.upload-date", "DESC")
      .getMany();
  }
}
