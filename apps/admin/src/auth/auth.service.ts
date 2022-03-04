import { AuthLoginDto } from '@libs/db/dto/user/auth-login.dto'
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login(authLoginDto: AuthLoginDto) {
    // 先查找用户是否存在
    // 验证用户
    const user = await this.userService.findUserByUsername(authLoginDto.username)
    if (!user) {
      throw new UnauthorizedException()
    }
    // 用户存在，判断密码是否正确
    if (!(await bcrypt.compare(authLoginDto.password, user.password))) {
      throw new UnauthorizedException()
    }

    const payload = {
      userId: user._id,
    }
    // 返回token
    return {
      access_token: this.jwtService.sign(payload),
      user_id: user._id,
      username: user.username,
    }
  }
}
