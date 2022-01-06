import { PartialType } from '@nestjs/mapped-types'
import { CreateArticleDto } from '../article/create-article.dto'

export class UpdateCategoryDto extends PartialType(CreateArticleDto) {}
