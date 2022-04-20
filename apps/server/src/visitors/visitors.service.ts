import { CreateVisitorDto } from '@libs/db/dto/visitor/create-visitor.dto'
import { LoginVisitorDto } from '@libs/db/dto/visitor/login-visitor.dto'
import { Visitor } from '@libs/db/schemas/visitor.schema'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class VisitorsService {
  constructor(
    @InjectModel(Visitor.name)
    private readonly visitorsModel: Model<Visitor>,
  ) {}

  // 创建访问者
  async createVisitor(visitor: CreateVisitorDto) {
    const newVisitor = new this.visitorsModel(visitor)
    return await newVisitor.save()
  }

  // 访问者登录
  // 根据邮箱和密码登录
  async loginInVisitor(visitor: LoginVisitorDto) {
    const res = await this.visitorsModel.aggregate([
      {
        $match: {
          email: visitor.email,
          password: visitor.password,
        },
      },
      {
        $project: {
          nickname: 1,
          email: 1,
        },
      },
    ])

    if (res.length === 0) {
      throw new UnauthorizedException()
    } else {
      return res[0]
    }
  }
}
