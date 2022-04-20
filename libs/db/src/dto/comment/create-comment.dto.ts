import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCommentDto {
  @ApiProperty({
    example: '',
    description: '该评论所在的文章Id',
  })
  @IsNotEmpty()
  @IsString()
  readonly article_id: string

  @ApiProperty({
    example: '',
    description: '该评论发布的作者Id',
  })
  @IsNotEmpty()
  @IsString()
  readonly visitor_id: string

  @ApiProperty({
    example: '<span>这是一条评论内容</span>',
    description: '评论内容',
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string

  @ApiProperty({
    example: '2022年4月1日',
    description: '发布评论的时间',
  })
  @IsNotEmpty()
  @IsString()
  readonly createdAt: string
}
