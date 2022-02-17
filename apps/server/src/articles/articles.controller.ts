import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common'
import { ApiBasicAuth } from '@nestjs/swagger'
import { ArticlesService } from './articles.service'

@ApiBasicAuth('Server-Article')
@Controller('article')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getAllArticle(@Res() res: any) {
    try {
      const articles = await this.articlesService.findAll()
      return res.json({
        articles,
      })
    } catch (error) {
      console.log('[server-Article] Error: ', error)
      throw new NotFoundException(`Get all articles failed`)
    }
  }

  @Get('/latest')
  @HttpCode(HttpStatus.OK)
  async getLatestArticle(@Res() res: any) {
    try {
      const articles = await this.articlesService.findLatestArticle()
      return res.json({
        articles,
      })
    } catch (error) {
      console.log('[server-Article] Error: ', error)
      throw new NotFoundException(`Get all articles failed`)
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getArticleById(@Res() res: any, @Param('id') id: string) {
    try {
      const articles = await this.articlesService.findArticleById(id)
      return res.json({
        articles,
      })
    } catch (error) {
      console.log('[server-Article] Error: ', error)
      throw new NotFoundException(`Get article #${id} failed`)
    }
  }
}
