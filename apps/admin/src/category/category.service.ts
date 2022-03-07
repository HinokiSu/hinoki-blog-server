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
    private categoryModel: Model<Category>,
  ) {}

  async createCategory(category: CreateCategoryDto): Promise<any> {
    const newCategory = new this.categoryModel(category)
    return newCategory.save()
  }

  async readAllCategory(): Promise<CategoryDocument[]> {
    return await this.categoryModel.find({}).exec()
  }

  async readCategoryById(cateId: string): Promise<CategoryDocument> {
    return await this.categoryModel.findById({ _id: cateId }).exec()
  }

  async updateCategory(cateId: string, category: UpdateCategoryDto): Promise<CategoryDocument> {
    return await this.categoryModel.findByIdAndUpdate({ _id: cateId }, category, {
      new: true,
    })
  }

  async deleteCategorybyId(cateId: string): Promise<any> {
    return await this.categoryModel.findByIdAndRemove({ _id: cateId })
  }

  // 获得所有类别
  async findAllCategoryForState() {
    return await this.categoryModel.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ])
  }
}
