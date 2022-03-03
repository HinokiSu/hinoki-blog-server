import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UtilsService {
  static getDataBaseConfig(): string {
    throw new Error('Method not implemented.')
  }
  constructor(private config: ConfigService) {}

  getJwtConfig(): string {
    const jwtConfigEnv = this.config.get('JWT_SECRET')

    if (!jwtConfigEnv) {
      throw Error(`env file not have [JWT_SECRET] env param`)
    }

    return jwtConfigEnv
  }
}
