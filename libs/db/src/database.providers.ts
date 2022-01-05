import { DATABASE_CONNECTION } from 'libs/constants/system.constant'
import * as mongoose from 'mongoose'

export const databaseProviders = [
  {
    // token 令牌
    provide: DATABASE_CONNECTION,
    // 动态创建Provider程序，实际的提供程序 为从工厂函数返回的值提供的。
    // ref: https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://localhost/blog_db'),
  },
]
