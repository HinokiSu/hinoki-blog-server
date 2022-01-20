import { CreateCategoryDto } from '@libs/db/dto/category/create-category.dto'
import { UpdateCategoryDto } from '@libs/db/dto/category/update-category.dto'
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
  @Post('/new')
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Res() res: any, @Body() category: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryService.createCategory(category)
      return res.json(newCategory)
    } catch (err) {
      console.log('[Category] Error: : ', err)
      throw new NotFoundException(`Get all articles failed`)
    }
  }

  // 获取所有类别
  @ApiResponse({
    status: 200,
    description: '获取所有文章类别',
  })
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async findAllCategory(@Res() res: any) {
    try {
      const categories = await this.categoryService.readAllCategory()
      return res.json({
        categories,
      })
    } catch (err) {
      console.log('[Category] Error: : ', err)
      throw new NotFoundException(`Get all categories failed`)
    }
  }

  // 根据Id 获取类别
  @ApiResponse({
    status: 200,
    description: '获取指定文章类别',
  })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findCategoryById(@Res() res: any, @Param('id') cateId: string) {
    try {
      const category = await this.categoryService.readCategoryById(cateId)
      return res.json(category)
    } catch (err) {
      console.log('[Category] Error: : ', err)
      throw new NotFoundException(`Get category #${cateId} failed`)
    }
  }

  // 更新类别
  @ApiResponse({
    status: 200,
    description: '更新指定的文章类别',
  })
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateyCategory(
    @Res() res: any,
    @Param('id') cateId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const category = await this.categoryService.updateCategory(cateId, updateCategoryDto)
      return res.json({
        message: 'Category has been updated successfully',
        category,
      })
    } catch (err) {
      console.log('[Category] Error: : ', err)
      throw new NotFoundException(`Update category failed`)
    }
  }

  // 删除类别
  @ApiResponse({
    status: 200,
    description: '删除指定的文章类别',
  })
  @Delete('/:id')
  async deleteCategory(@Res() res: any, @Param('id') cateId: string) {
    try {
      const result = await this.categoryService.deleteCategory(cateId)
      return res.json({
        message: 'Category has been deleted',
        result,
      })
    } catch (err) {
      console.log('[Category] Error: : ', err)
      throw new NotFoundException(`Delete caregory failed`)
    }
  }
}
