import { CategorySchema } from '@libs/db/schemas/category.schema'
import { DATABASE_CONNECTION } from 'libs/constants/system.constant'
import { Mongoose } from 'mongoose'
import { CATEGORY_MODEL } from '../constants/server.constant'

export const categoriesProviders = [
  {
    provide: CATEGORY_MODEL,
    // 使用schema 创建 model
    useFactory: (mongoose: Mongoose) => mongoose.model('Category', CategorySchema, 'category'),
    inject: [DATABASE_CONNECTION],
  },
]
