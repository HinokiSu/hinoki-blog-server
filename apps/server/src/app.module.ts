import { mongooseModule } from '@libs/db/hooks/mongoose.module'
import { AppConfigurationModule } from '@libs/db/infrastructure/configuration/app-configuration.module'
import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ArticlesModule } from './articles/articles.module'
import { CategoriesModule } from './categories/categories.module'
import { serverRoute } from './route'

@Module({
  imports: [
    ArticlesModule,
    CategoriesModule,
    AppConfigurationModule,
    mongooseModule,
    RouterModule.register(serverRoute),
  ],
})
export class AppModule {}
