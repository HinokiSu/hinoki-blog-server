import { Controller, Get, HttpCode, HttpStatus, NotFoundException, Res } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { StateService } from './state.serivce'

@ApiTags('Admin State')
@Controller()
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @ApiResponse({
    status: 200,
    description: '根据统计 每一个类别中的 所有的文章数量',
  })
  @Get('/category')
  @HttpCode(HttpStatus.OK)
  async getStateByCategory(@Res() res: any) {
    try {
      const result = await this.stateService.findStateByEveryCategory()
      return res.json({
        message: 'success',
        fettle: result,
      })
    } catch (err) {
      console.log('[State] Error: : ', err)
      throw new NotFoundException(`State: get State by category failed`)
    }
  }

  @ApiResponse({
    status: 200,
    description: '获取浏览量前五的文章',
  })
  @Get('/article/top')
  @HttpCode(HttpStatus.OK)
  async getTotalArticle(@Res() res: any) {
    try {
      const result = await this.stateService.findTopArticleList()
      return res.json({
        message: 'success',
        fettle: result,
      })
    } catch (err) {
      console.log('[State] Error: : ', err)
      throw new NotFoundException(`State: get State by category failed`)
    }
  }

  @ApiResponse({
    status: 200,
    description: '统计每一个类别中的 所有的文章累计的浏览量',
  })
  @Get('/pageviews/category')
  @HttpCode(HttpStatus.OK)
  async getTotalVisitByCategory(@Res() res: any) {
    try {
      const result = await this.stateService.findTotalVisitByCategory()
      return res.json({
        message: 'success',
        fettle: result,
      })
    } catch (err) {
      console.log('[State] Error: : ', err)
      throw new NotFoundException(`State: get State by category failed`)
    }
  }

  @ApiResponse({
    status: 200,
    description: '统计每一篇文章的评论数',
  })
  @Get('/pageviews/comment')
  @HttpCode(HttpStatus.OK)
  async getTotalCommentByEveryArticle(@Res() res: any) {
    try {
      const result = await this.stateService.findTotalCommentByEveryArticle()
      return res.json({
        message: 'success',
        fettle: result,
      })
    } catch (err) {
      console.log('[State] Error: : ', err)
      throw new NotFoundException(`State: get State by category failed`)
    }
  }
}
