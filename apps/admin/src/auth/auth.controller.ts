import { AuthLoginDto } from '@libs/db/dto/user/auth-login.dto'
import { JwtAuthGuard } from '@libs/utils/jwt/jwt-auth.guard'
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'

@ApiTags('Admin Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录验证
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto)
  }

  // 测试
  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Success!'
  }
}
