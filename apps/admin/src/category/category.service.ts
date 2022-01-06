import { CreateCategoryDto } from '@libs/db/dto/category/create-category.dto'
import { UpdateCategoryDto } from '@libs/db/dto/category/update-category.dto'
import { CategoryDocument } from '@libs/db/interfaces/category.interface'
import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { CATEGORY_MODEL } from '../constants/module.constant'

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_MODEL)
    private CategoryModel: Model<CategoryDocument>,
  ) {}

  // 创建 分类
  async createCategory(category: CreateCategoryDto): Promise<CategoryDocument> {
    // TODO: 不能有相同类别名称
    const newCategory = new this.CategoryModel(category)
    return newCategory.save()
  }

  // 获取所有 分类
  async readAllCategory(): Promise<CategoryDocument[]> {
    return await this.CategoryModel.find({}).exec()
  }

  // 根据Id 获取 分类
  async readCategoryById(cateId: string): Promise<CategoryDocument> {
    return await this.CategoryModel.findById({ _id: cateId }).exec()
  }

  // 更新分类
  async updateCategory(cateId: string, category: UpdateCategoryDto): Promise<CategoryDocument> {
    // TODO: 更新不能有相同类别名称，且要返回
    return await this.CategoryModel.findByIdAndUpdate({ _id: cateId }, category, {
      new: true,
    })
  }

  // 删除分类
  async deleteCategory(cateId: string): Promise<any> {
    return await this.CategoryModel.findByIdAndRemove({ _id: cateId })
  }
}
