import { EntityRepository, Repository } from "typeorm";
import { Comment } from "./comment.entity";

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
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
      .getOne();
    return comment.comment;
  }
}
