import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UtilsService } from './utils.service'
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [UtilsModule],
      inject: [UtilsService],
      useFactory: async () => ({
        secret: UtilsService.getDataBaseConfig(),
      }),
    }),
  ],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
