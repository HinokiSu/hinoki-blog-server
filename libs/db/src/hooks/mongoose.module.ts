import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { DatabaseModule } from '..'
import { DatabaseService } from '../database.service'

// 导入Mongoose依赖模块
export const mongooseModule = MongooseModule.forRootAsync({
  imports: [DatabaseModule],
  inject: [DatabaseService],
  useFactory: (appConfigService: DatabaseService) => {
    const options: MongooseModuleOptions = {
      // 从环境变量获取
      uri: appConfigService.getDataBaseConfig(),
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    return options
  },
})
