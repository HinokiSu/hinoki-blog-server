import { Schema } from 'mongoose'
import { nowDateFormat } from '@libs/utils/format'
export const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    classification: {
      type: Array,
      default: [],
    },
    markdown: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
    isVisible: {
      type: String,
      default: 'true',
    },
    createdAt: {
      type: String,
      default: nowDateFormat('YYYY-MM-DD hh:mm:ss'),
    },
    updatedAt: {
      type: String,
      default: nowDateFormat('YYYY-MM-DD hh:mm:ss'),
    },
  },
  {
    versionKey: false,
  },
)
