/*
// TODO: 优化 nestjs/mongoose写法
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Article {
  @Prop()
  title: string

  @Prop()
  author: string

  @Prop()
  date: string
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
 */

import { Schema } from 'mongoose'

export const ArticleSchema = new Schema(
  {
    title: String,
    author: String,
  },
  {
    versionKey: false,
    // 自动添加时间戳， createdAt, updatedAt 字段
    timestamps: {
      // 重新命名
      createdAt: 'created_At',
      updatedAt: 'updated_At',
    },
  },
)
