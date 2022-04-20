import { nowDateFormat } from '@libs/utils/format'
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'

@Schema({ collection: 'article', versionKey: false })
export class Article {
  @Prop()
  title: string

  @Prop()
  description: string

  @Prop()
  classification: []

  @Prop()
  markdown: string

  @Prop({ default: 'true' })
  isVisible: string

  @Prop({ default: nowDateFormat('YYYY-MM-DD HH:mm:ss') })
  createdAt: string

  @Prop({ default: nowDateFormat('YYYY-MM-DD HH:mm:ss') })
  updatedAt: string

  @Prop({ default: 0 })
  totalVisits: number
}

export const ArticleSchema = SchemaFactory.createForClass(Article)

export type ArticleDocument = Article & Document
