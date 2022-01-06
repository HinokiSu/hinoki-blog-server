// article interface

import { Document } from 'mongoose'

export interface ArticleDocument extends Document {
  readonly articleId: string
  readonly title: string
  readonly author: string
  readonly date: string
}
