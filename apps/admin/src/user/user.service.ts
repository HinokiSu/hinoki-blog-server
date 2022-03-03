import { CreateUserDto } from '@libs/db/dto/user/create-user.dto'
import { User, UserDocument } from '@libs/db/schemas/user.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import * as bcrypt from 'bcryptjs'

interface IUser {
  username: string
  password: string
}
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  // hash加密
  async hashPassword(raw: string) {
    return await bcrypt.hash(raw, 8)
  }

  // 创建用户
  async createUser(createUserDto: CreateUserDto): Promise<string> {
    // 验证用户是否存在
    if (await this.findUserByUsername(createUserDto.username)) {
      return 'exist'
    }
    const rawUser: IUser = {
      ...createUserDto,
    }
    // 原密码替换为 经过hash加密的密码
    rawUser.password = await this.hashPassword(createUserDto.password)
    const user = new this.userModel(rawUser)

    await user.save()
    return user.username
  }

  async findUserByUsername(username: string) {
    return await this.userModel.findOne({ username })
  }

  async findUserById(uid: string): Promise<UserDocument[]> {
    return await this.userModel.aggregate([
      {
        $match: {
          // if no `new Types.ObjectId()`,it will not work
          _id: new Types.ObjectId(uid),
        },
      },
    ])
  }
}
