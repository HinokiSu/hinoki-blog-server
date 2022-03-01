import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { getEnvPath } from './config/env.configuration'
import { DatabaseService } from './database.service'

const envFilePath: string = getEnvPath()
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: envFilePath, isGlobal: true }),
    MongooseModule.forRootAsync({
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
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
