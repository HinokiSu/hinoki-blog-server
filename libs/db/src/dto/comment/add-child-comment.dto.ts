import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AddChildCommentDto {
  @ApiProperty({
    example: '',
    description: '回复该评论的作者Id',
  })
  @IsNotEmpty()
  @IsString()
  readonly visitor_id: string

  @ApiProperty({
    example: '',
    description: '回复给哪个的用户',
  })
  @IsNotEmpty()
  @IsString()
  readonly reply_to_visitor: string

  @ApiProperty({
    example: '<span>这是一条评论内容</span>',
    description: '评论内容',
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string

  @ApiProperty({
    example: '2022年4月1日',
    description: '发布时间的时间',
  })
  @IsNotEmpty()
  @IsString()
  readonly createdAt: string
}
