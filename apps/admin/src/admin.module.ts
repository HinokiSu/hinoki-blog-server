import { Module } from '@nestjs/common'
import { mongooseModule } from '@libs/db/hooks/mongoose.module'
import { RouterModule } from '@nestjs/core'
import { ArticleModule } from './article/article.module'
import { CategoryModule } from './category/category.module'
import { adminRoute } from './route'
import { AppConfigurationModule } from '@libs/db/infrastructure/configuration/app-configuration.module'

@Module({
  imports: [
    ArticleModule,
    CategoryModule,
    AppConfigurationModule,
    mongooseModule,
    RouterModule.register(adminRoute),
  ],
})
export class AdminModule {}
