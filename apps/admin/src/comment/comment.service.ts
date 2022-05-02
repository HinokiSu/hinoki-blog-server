import { formattedComment } from '@libs/db/pipeline/comment.pipeline'
import { Comment } from '@libs/db/schemas/comment.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
interface ICommentTotal {
  _id: string
  total: number
}
@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<Comment>,
  ) {}

  // 获取所有评论(仅父级)
  async findParentComments() {
    return await this.commentModel.aggregate([
      ...formattedComment,
      {
        $sort: {
          _id: -1,
        },
      },
    ])
  }

  // 根据评论id(父级) 获取评论(父子级)
  async findParentCommentById(id: string) {
    return await this.commentModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      ...formattedComment,
    ])
  }

  // 根据访问者Id查询 其所有的评论（仅限父级）
  async findParentCommentsByVisitorId(visitorId: string) {
    return await this.commentModel.aggregate([
      {
        $match: {
          visitor_id: visitorId,
        },
      },
      ...formattedComment,
      {
        $sort: {
          _id: -1,
        },
      },
    ])
  }

  // 根据评论Id(父级), 删除评论
  async removeCommentByComId(commentId: string) {
    return await this.commentModel.findByIdAndDelete({ _id: commentId })
  }

  // 统计每篇文章，的评论数量
  async findTotalCommentByArticleId(id: string) {
    // 获取所有文章的Id,
    return await this.commentModel.aggregate([
      {
        $match: {
          article_id: new Types.ObjectId(id),
        },
      },
      {
        $group: {
          _id: {
            $toObjectId: '$article_id',
          },
          par_total: {
            $count: {},
          },
        },
      },
      {
        $lookup: {
          from: 'article',
          localField: '_id',
          foreignField: '_id',
          as: 'article',
        },
      },
      {
        $unwind: {
          path: '$article',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          title: '$article.title',
        },
      },
      {
        $project: {
          article: 0,
        },
      },
    ])
  }

  // 根据文章id 统计该文章的评论数量
  /**
   *
   * @param articleId string 文章Id
   * @returns commentTotal number 评论总数
   */
  async countCommentNumberByArticleId(articleId: string) {
    let commentTotal: number
    await this.countParentCommentByArticleId(articleId).then((val) => {
      if (val.length === 0) {
        commentTotal = 0
      } else {
        commentTotal = val[0].total
      }
    })
    await this.countChildCommentByArticleId(articleId).then((val) => {
      if (val.length !== 0) {
        commentTotal += val[0].total
      }
    })
    return commentTotal
  }

  // 根据文章id 统计 【子级】评论数量
  /**
   *
   * @param articleId string 文章id
   * @returns child_total 子级评论的总数量
   */
  async countChildCommentByArticleId(articleId: string): Promise<ICommentTotal[]> {
    return await this.commentModel.aggregate([
      {
        $match: {
          article_id: articleId,
        },
      },
      {
        $addFields: {
          child_comments_total: {
            $size: '$child_comments',
          },
        },
      },
      {
        $group: {
          _id: '$article_id',
          total: {
            $sum: '$child_comments_total',
          },
        },
      },
    ])
  }

  // 根据文章Id 统计 【父级】评论数量
  /**
   *
   * @param articleId string
   * @returns parent_total 父级评论的总数量
   */
  async countParentCommentByArticleId(articleId: string): Promise<ICommentTotal[]> {
    return await this.commentModel.aggregate([
      {
        $match: {
          article_id: articleId,
        },
      },
      {
        $group: {
          _id: '$article_id',
          total: {
            $count: {},
          },
        },
      },
    ])
  }
}
