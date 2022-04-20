import { Document, Types } from 'mongoose'
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'

/* type ChildComment = {
  visitor_id: string
  reply_to_visitor: string
  content: string
  created_time: string
} */

/* 
  评论的一个 父级， child_comments中的都是子级的，需要指定格式，前端哪里进行限制
*/
// collection 自定义集合名称， versionKey,禁止文档内置版本值
@Schema({ collection: 'comment', versionKey: false, timestamps: false })
export class Comment {
  @Prop()
  article_id: string

  @Prop()
  visitor_id: string

  @Prop()
  content: string

  @Prop()
  createdAt: string

  @Prop()
  child_comments: []
}

export const CommentSchema = SchemaFactory.createForClass(Comment)

export type CommentDocument = Comment & Document
