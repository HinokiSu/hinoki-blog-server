// article interface

import { Document } from 'mongoose'

export interface ArticleDocument extends Document {
  readonly title: string
  readonly author: string
  readonly cate_id: string
  readonly content: string
  readonly content_md: string
}
