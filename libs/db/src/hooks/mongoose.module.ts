import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { AppConfigurationModule } from '../infrastructure/configuration/app-configuration.module'
import { AppConfigurationService } from '../infrastructure/configuration/app-configuration.service'

// 导入Mongoose依赖模块
export const mongooseModule = MongooseModule.forRootAsync({
  imports: [AppConfigurationModule],
  inject: [AppConfigurationService],
  useFactory: (appConfigService: AppConfigurationService) => {
    const options: MongooseModuleOptions = {
      // 从环境变量获取
      uri: appConfigService.connectionString,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    return options
  },
})
