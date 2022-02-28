import { CreateCategoryDto } from '@libs/db/dto/category/create-category.dto'
import { UpdateCategoryDto } from '@libs/db/dto/category/update-category.dto'
import { Category, CategoryDocument } from '@libs/db/schemas/category.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private CategoryModel: Model<Category>,
  ) {}

  async createCategory(category: CreateCategoryDto): Promise<any> {
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

  async deleteCategorybyId(cateId: string): Promise<any> {
    return await this.CategoryModel.findByIdAndRemove({ _id: cateId })
  }
}
