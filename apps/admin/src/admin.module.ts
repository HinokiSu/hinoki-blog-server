import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ArticleModule } from './article/article.module'
import { CategoryModule } from './category/category.module'
import { adminRoute } from './route'
import { DatabaseModule } from '@libs/db'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { StateModule } from './state/state.module'

@Module({
  imports: [
    DatabaseModule,
    ArticleModule,
    CategoryModule,
    UserModule,
    AuthModule,
    StateModule,
    RouterModule.register(adminRoute),
  ],
})
export class AdminModule {}
