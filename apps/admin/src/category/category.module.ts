import { DatabaseModule } from '@libs/db/database.module'
import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { categoryProviders } from './category.provider'
import { CategoryService } from './category.service'

@Module({
  imports: [DatabaseModule],
  providers: [CategoryService, ...categoryProviders],
  controllers: [CategoryController],
})
export class CategoryModule {}
