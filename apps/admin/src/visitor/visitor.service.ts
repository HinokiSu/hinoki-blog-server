import { Visitor } from '@libs/db/schemas/visitor.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

@Injectable()
export class VisitorService {
  constructor(
    @InjectModel(Visitor.name)
    private visitorModel: Model<Visitor>,
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

  // 根据ID 删除访问者
  async removeVisitorById(id: string) {
    return await this.visitorModel.findByIdAndDelete({ _id: id })
  }
}
