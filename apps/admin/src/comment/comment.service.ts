import { formattedComment } from '@libs/db/pipeline/comment.pipeline'
import { Comment } from '@libs/db/schemas/comment.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<Comment>,
  ) {}

  // 根据访问者Id查询 其所有的评论（仅限父级）
  async findParentCommentsByVisitorId(visitorId: string) {
    return await this.commentModel.aggregate([
      {
        $match: {
          visitor_id: visitorId,
        },
      },
      ...formattedComment,
    ])
  }

  // 删除评论，根据评论id
  async removeCommentByComId(commentId: string) {
    return await this.commentModel.findByIdAndDelete({ _id: commentId })
  }
}
