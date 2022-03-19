import { Document } from 'mongoose'
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'
import { nowDateFormat } from '@libs/utils'

// collection 自定义集合名称， versionKey,禁止文档内置版本值
@Schema({ collection: 'category', versionKey: false, timestamps: true })
export class Category {
  @Prop()
  name: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)

export type CategoryDocument = Category & Document
