import { CreateUserDto } from '@libs/db/dto/user/create-user.dto'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'

@ApiTags('Admin User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 创建 类别
  @ApiResponse({
    status: 200,
    description: '创建用户',
  })
  @Post('/new')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Res() res: any, @Body() category: CreateUserDto) {
    try {
      const user = await this.userService.createUser(category)
      if (user === 'exist') {
        return res.json({
          message: 'User exist',
          user: '',
        })
      }
      return res.json({
        message: 'User has been successfully created',
        user,
      })
    } catch (err) {
      console.log('[User] Error: : ', err)
      throw new NotFoundException(`Get all User failed`)
    }
  }

  // 根据Id 获取用户
  @ApiResponse({
    status: 200,
    description: '获取指定用户',
  })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findUserById(@Res() res: any, @Param('id') uid: string) {
    try {
      const user = await this.userService.findUserById(uid)
      return res.json({
        message: 'User have been found',
        user,
      })
    } catch (err) {
      console.log('[User] Error: : ', err)
      throw new NotFoundException(`Get User #${uid} failed`)
    }
  }
}
