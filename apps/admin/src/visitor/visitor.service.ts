import { Visitor } from '@libs/db/schemas/visitor.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CommentService } from '../comment/comment.service'

@Injectable()
export class VisitorService {
  constructor(
    @InjectModel(Visitor.name)
    private visitorModel: Model<Visitor>,
    private commentService: CommentService,
  ) {}

  // 查询所有 访问者
  async findVisitors() {
    return await this.visitorModel.aggregate([
      {
        $project: {
          password: 0,
          updatedAt: 0,
        },
      },
    ])
  }

  // 根据ID 查询访问者
  async findVisitorById(id: string) {
    return await this.visitorModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $project: {
          password: 0,
          updatedAt: 0,
        },
      },
    ])
  }

  // 根据ID 删除访问者及其评论
  async removeVisitorById(id: string) {
    await this.visitorModel
      .findByIdAndDelete({ _id: id })
      .then(
        async () => {
          await this.commentService.removeParentCommentByVisitorId(id)
        },
        () => {
          console.log('delete visitor error')
        },
      )
      .then(
        async () => {
          await this.commentService.removeChildCommentByVisitorId(id)
        },
        () => {
          console.log('delete parent comment by visitor error')
        },
      )

      .then(
        () => {
          return 'delete OK'
        },
        () => {
          console.log('delete child comment by visitor error')
        },
      )
  }
}
