import { DatabaseModule } from '@libs/db/database.module'
import { Module } from '@nestjs/common'
import { ArticleController } from './article.controller'
import { articleProviders } from './article.provider'
import { ArticleService } from './article.service'

@Module({
  imports: [DatabaseModule],
  providers: [ArticleService, ...articleProviders],
  controllers: [ArticleController],
})
export class ArticleModule {}
