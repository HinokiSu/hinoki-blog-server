import { CreateUserDto } from '@libs/db/dto/user/create-user.dto'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { get } from 'http'
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
  @HttpCode(HttpStatus.OK)
  async createUser(@Res() res: any, @Body() user: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(user)
      if (newUser === 'exist') {
        return res.json({
          message: 'User exist',
          user: '',
        })
      }
      return res.json({
        message: 'User has been successfully created',
        user: newUser,
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

  // 获取所有用户，除了admin
  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取所有用户,除了admin',
  })
  async findAllUser(@Res() res: any) {
    try {
      const users = await this.userService.findUsers()
      res.json({
        message: 'Users has been found successfully',
        users,
      })
    } catch (err) {
      console.log('[User] Error: : ', err)
      throw new NotFoundException(`Get Users failed`)
    }
  }

  /* // 更新用户信息
  @Put('/:id')
  async updateUser(@Res() res: any, @Param('id') id: string) {
    try {
      const users = await this.userService.updateUser(id)
      res.json({
        message: 'User has been Updated successfully',
        users,
      })
    } catch (err) {
      console.log('[User] Error: : ', err)
      throw new NotFoundException(`Update User failed`)
    }
  } */

  // 删除用户
  @Delete('/:id')
  async deleteUser(@Res() res: any, @Param('id') id: string) {
    try {
      await this.userService.deleteUser(id)
      res.json({
        message: 'Users has been deleted successfully',
      })
    } catch (err) {
      console.log('[User] Error: : ', err)
      throw new NotFoundException(`Delete Users failed`)
    }
  }
}
