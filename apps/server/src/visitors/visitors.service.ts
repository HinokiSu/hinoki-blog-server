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
  async createVisitor(visitor: CreateVisitorDto): Promise<any> {
    const findExistEmail = await this.judgeVisitorEmailIsExist(visitor.email)
    const findExistNickname = await this.judgeVisitorNicknameIsExist(visitor.nickname)
    if (findExistNickname.length > 0) {
      return '注册使用的昵称已存在'
    }
    if (findExistEmail.length > 0) {
      return '注册使用的邮箱已存在'
    } else {
      const newVisitor = new this.visitorsModel(visitor)
      await newVisitor.save()
      return ''
    }
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

  // 判断注册的访问者邮箱是否存在
  async judgeVisitorEmailIsExist(email: string): Promise<any[]> {
    return this.visitorsModel.aggregate([
      {
        $match: {
          email: email,
        },
      },
    ])
  }

  // 判断注册的访问者的 昵称是否存在
  async judgeVisitorNicknameIsExist(nickname: string): Promise<any[]> {
    return this.visitorsModel.aggregate([
      {
        $match: {
          nickname: nickname,
        },
      },
    ])
  }
}
