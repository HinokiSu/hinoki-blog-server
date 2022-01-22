import { DatabaseModule } from '@libs/db/database.module'
import { Module } from '@nestjs/common'
import { ArticlesController } from './articles.controller'
import { articlesProviders } from './articles.provider'
import { ArticlesService } from './articles.service'

@Module({
  imports: [DatabaseModule],
  providers: [ArticlesService, ...articlesProviders],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
