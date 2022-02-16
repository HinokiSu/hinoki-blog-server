import { DatabaseModule } from '@libs/db/database.module'
import { Module } from '@nestjs/common'
import { CategoriesController } from './categories.controller'
import { categoriesProviders } from './categories.provider'
import { CategoriesService } from './categories.service'

@Module({
  imports: [DatabaseModule],
  providers: [CategoriesService, ...categoriesProviders],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
