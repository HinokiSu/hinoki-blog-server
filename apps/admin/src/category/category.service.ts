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

  async createCategory(category: CreateCategoryDto): Promise<CategoryDocument> {
    const newCategory = new this.CategoryModel(category)
    return newCategory.save()
  }

  async readAllCategory(): Promise<CategoryDocument[]> {
    return await this.CategoryModel.find({}).exec()
  }

  async readCategoryById(cateId: string): Promise<CategoryDocument> {
    return await this.CategoryModel.findById({ _id: cateId }).exec()
  }

  async updateCategory(cateId: string, category: UpdateCategoryDto): Promise<CategoryDocument> {
    return await this.CategoryModel.findByIdAndUpdate({ _id: cateId }, category, {
      new: true,
    })
  }

  async deleteCategory(cateId: string): Promise<any> {
    return await this.CategoryModel.findByIdAndRemove({ _id: cateId })
  }
}
