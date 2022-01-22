import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticlesController } from './articles/articles.controller'
import { ArticlesModule } from './articles/articles.module'

@Module({
  imports: [ArticlesModule],
})
export class AppModule {}
