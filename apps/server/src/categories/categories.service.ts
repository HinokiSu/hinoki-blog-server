import { Category, CategoryDocument } from '@libs/db/schemas/category.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  // 获取所有类别
  async readAllCategory(): Promise<CategoryDocument[]> {
    return await this.categoryModel
      .aggregate([
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
          },
        },
      ])
      .exec()
  }

  // 根据ID获取类别
  async readCategoryById(id: string): Promise<CategoryDocument[]> {
    return await this.categoryModel
      .aggregate([
        {
          $match: {
            _id: new Types.ObjectId(id),
          },
        },
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
          },
        },
      ])
      .exec()
  }
}
