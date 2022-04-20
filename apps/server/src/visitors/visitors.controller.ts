import { CreateVisitorDto } from '@libs/db/dto/visitor/create-visitor.dto'
import { LoginVisitorDto } from '@libs/db/dto/visitor/login-visitor.dto'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { VisitorsService } from './visitors.service'

@ApiTags('Server visitors')
@Controller()
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  // 注册访问者
  @ApiResponse({
    status: HttpStatus.OK,
    description: '注册访问者',
  })
  @Post('/register')
  @HttpCode(HttpStatus.OK)
  async registerVisitor(@Res() res: any, @Body() visitor: CreateVisitorDto) {
    try {
      await this.visitorsService.createVisitor(visitor)
      res.json({
        message: 'vistor registered successfully',
      })
    } catch (err) {
      console.log(`[Server] Visitor Error: \n ${err}`)
      throw new NotFoundException(`Register visitor failed`)
    }
  }

  // 访问者登录
  @ApiResponse({
    status: HttpStatus.OK,
    description: '访问者登录',
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async signInVisitor(@Res() res: any, @Body() visitor: LoginVisitorDto) {
    const rt = await this.visitorsService.loginInVisitor(visitor)
    res.json({
      message: 'visitor login success',
      visitor: rt,
    })
  }
}
