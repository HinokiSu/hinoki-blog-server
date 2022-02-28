import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CategoriesService } from './categories.service'

@ApiTags('Server Categories')
@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取所有文章类别',
  })
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getAllCategory(@Res() res: any) {
    try {
      const categories = await this.categoriesService.readAllCategory()
      return res.json({
        categories,
      })
    } catch (err) {
      console.log(`[Server] Category Error: \n ${err}`)
      throw new NotFoundException(`Get all categories failed`)
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取指定id的文章类别',
  })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getCategoryByID(@Res() res: any, @Param('id') id: string) {
    try {
      const category = await this.categoriesService.readCategoryById(id)
      return res.json({
        category,
      })
    } catch (err) {
      console.log(`[Server] Category Error: \n ${err}`)
      throw new NotFoundException(`Get category #${id} failed`)
    }
  }
}
