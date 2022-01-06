import { CreateCategoryDto } from '@libs/db/dto/category/create-category.dto'
import { UpdateCategoryDto } from '@libs/db/dto/category/update-category.dto'
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CategoryService } from './category.service'

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // 创建 类别
  @ApiResponse({
    status: 200,
    description: '创建文章类别',
  })
  @Post('/create')
  async createCategory(@Res() res: any, @Body() category: CreateCategoryDto) {
    const newCategory = await this.categoryService.createCategory(category)
    return res.status(HttpStatus.OK).json(newCategory)
  }

  // 获取所有类别
  @ApiResponse({
    status: 200,
    description: '获取所有文章类别',
  })
  @Get('/categories')
  async findAllCategory(@Res() res: any) {
    const categories = await this.categoryService.readAllCategory()
    return res.status(HttpStatus.OK).json(categories)
  }

  // 根据Id 获取类别
  @ApiResponse({
    status: 200,
    description: '获取指定文章类别',
  })
  @Get('/:id')
  async findCategoryById(@Res() res: any, @Param('id') cateId: string) {
    const category = await this.categoryService.readCategoryById(cateId)
    return res.status(HttpStatus.OK).json(category)
  }

  // 更新类别
  @ApiResponse({
    status: 200,
    description: '更新指定的文章类别',
  })
  @Put('/:id')
  async updateyCategory(
    @Res() res: any,
    @Param('id') cateId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = this.categoryService.updateCategory(cateId, updateCategoryDto)
    return res.status(HttpStatus.OK).json(category)
  }

  // 删除类别
  @ApiResponse({
    status: 200,
    description: '删除指定的文章类别',
  })
  @Delete('/:id')
  async deleteCategory(@Res() res: any, @Param('id') cateId: string) {
    const result = this.categoryService.deleteCategory(cateId)
    return res.status(HttpStatus.OK).json(result)
  }
}
