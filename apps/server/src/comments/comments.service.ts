import { AddChildCommentDto } from '@libs/db/dto/comment/add-child-comment.dto'
import { CreateCommentDto } from '@libs/db/dto/comment/create-comment.dto'
import { formattedComment } from '@libs/db/pipeline/comment.pipeline'
import { Comment } from '@libs/db/schemas/comment.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

interface ICommentTotal {
  _id: string
  total: number
}

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentsModel: Model<Comment>,
  ) {}

  // 创建父级评论
  async CreateParentCommnet(createComment: CreateCommentDto) {
    const comment = new this.commentsModel(createComment)
    return await comment.save()
  }

  // 查找父级评论
  async findParentComment(commentId: string) {
    return this.commentsModel.findById({ _id: commentId })
  }

  // 添加子级评论，子级仅有一层
  async addChildComment(parentId: string, addChildCommentDto: AddChildCommentDto) {
    // 先查找父级评论所在，插入其child_commets字段的数组中
    return this.commentsModel.findByIdAndUpdate(
      { _id: parentId },
      {
        $push: {
          child_comments: {
            ...addChildCommentDto,
          },
        },
      },
    )
  }

  // 根据文章ID 查找该文章的所有评论
  /* 
   !BUG: 当child_comments数组为空时，在$group后，会在数组中添加一个空对象{}
    child_comments:Array
      0:Object
  */
  async findCommentsByArticleID(articleId: string): Promise<any[]> {
    // 前置要求，在（父级、子级）的评论中， 要根据用户的id查找其相应的用户名
    return this.commentsModel.aggregate([
      {
        $match: {
          article_id: articleId,
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
    return await this.commentsModel.aggregate([
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
    return await this.commentsModel.aggregate([
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
