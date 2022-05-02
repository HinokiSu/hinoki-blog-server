import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { VisitorService } from './visitor.service'

@ApiTags('Admin Visitor')
@Controller()
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  // 查询所有评论
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '查询所有访问者',
  })
  async getCommentByParentId(@Res() res: any) {
    try {
      const visitors = await this.visitorService.findVisitors()
      return res.json({
        message: 'Comments has been found',
        visitors,
      })
    } catch (error) {
      throw new NotFoundException(`All Visitor not found`)
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '根据访问者Id, 查询访问者',
  })
  async getVisitorById(@Res() res: any, @Param('id') id: string) {
    try {
      const visitors = await this.visitorService.findVisitorById(id)
      return res.json({
        message: 'Visitor has been found by id',
        visitors,
      })
    } catch (error) {
      throw new NotFoundException(`visitor by #${id} not found`)
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '根据id,删除visitor',
  })
  async deleteVisitorById(@Res() res: any, @Param('id') id: string) {
    try {
      const visitors = await this.visitorService.removeVisitorById(id)
      return res.json({
        message: 'Visitor has been delete by id',
        visitors,
      })
    } catch (error) {
      throw new NotFoundException(`visitor delete failed by #${id}`)
    }
  }
}
