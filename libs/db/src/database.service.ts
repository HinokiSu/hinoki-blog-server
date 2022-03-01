import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DatabaseService {
  constructor(private config: ConfigService) {}

  getDataBaseConfig(): string {
    const envConfig = {
      ip: this.config.get('DATABASE_HOST') ? this.config.get('DATABASE_HOST') : 'localhost',
      port: this.config.get('DATABASE_PORT') ? this.config.get('DATABASE_PORT') : '27017',
      collection: this.config.get('DATABASE_COLLECTION')
        ? this.config.get('DATABASE_COLLECTION')
        : '',
      user: this.config.get('DATABASE_USER') ? this.config.get('DATABASE_USER') + ':' : '',
      pwd: this.config.get('DATABASE_PWD') ? this.config.get('DATABASE_PWD') + '@' : '',
    }

    const mongodbUrl = `mongodb://${envConfig.user}${envConfig.pwd}${envConfig.ip}:${
      envConfig.port
    }/${envConfig.collection}?${
      envConfig.user ? 'authSource=' + envConfig.collection + '&' : ''
    }serverSelectionTimeoutMS=2000`

    console.log('url', mongodbUrl)

    return mongodbUrl
  }
}
