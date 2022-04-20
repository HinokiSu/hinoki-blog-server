import { PipelineStage } from 'mongoose'

export const formattedComment: PipelineStage[] = [
  {
    $addFields: {
      visitor_id: {
        $toObjectId: '$visitor_id',
      },
    },
  },
  {
    $lookup: {
      from: 'visitor',
      localField: 'visitor_id',
      foreignField: '_id',
      as: 'visitor',
    },
  },
  {
    $unwind: {
      path: '$visitor',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $unwind: {
      path: '$child_comments',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $addFields: {
      'child_comments.visitor_id': {
        $toObjectId: '$child_comments.visitor_id',
      },
    },
  },
  {
    $lookup: {
      from: 'visitor',
      localField: 'child_comments.visitor_id',
      foreignField: '_id',
      as: 'child_comments.visitor',
    },
  },
  {
    $unwind: {
      path: '$child_comments.visitor',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $project: {
      visitor_id: 0,
      'visitor.password': 0,
      'visitor.createdAt': 0,
      'visitor.updatedAt': 0,
      'child_comments.visitor_id': 0,
      'child_comments.visitor.password': 0,
      'child_comments.visitor.createdAt': 0,
      'child_comments.visitor.updatedAt': 0,
    },
  },
  {
    $group: {
      _id: '$_id',
      child_comments: {
        $push: '$child_comments',
      },
      content: {
        $first: '$content',
      },
      article_id: {
        $first: '$article_id',
      },
      visitor: {
        $first: '$visitor',
      },
      createdAt: {
        $first: '$createdAt',
      },
    },
  },
]
