import { CategoryDocument } from '@libs/db/interfaces/category.interface'
import { Inject, Injectable } from '@nestjs/common'
import { CATEGORY_MODEL } from 'apps/admin/src/constants/module.constant'
import { Model, Types } from 'mongoose'

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORY_MODEL)
    private CategoryModel: Model<CategoryDocument>,
  ) {}

  async readAllCategory(): Promise<CategoryDocument[]> {
    return await this.CategoryModel.aggregate([
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
        },
      },
    ]).exec()
  }

  async readCategoryById(id: string): Promise<CategoryDocument> {
    return await this.CategoryModel.aggregate([
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
    ])[0].exec()
  }
}
