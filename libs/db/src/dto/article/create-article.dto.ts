import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

// 请求有效载荷
export class CreateArticleDto {
  @ApiProperty({
    example: '如何使用nestJs',
    description: '文章标题',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @ApiProperty({ example: 'Hinoki', description: '作者名称' })
  @IsNotEmpty()
  @IsString()
  readonly author: string

  @ApiProperty({
    example: 'nestJs',
    description: '文章类别Id',
  })
  @IsNotEmpty()
  @IsString()
  readonly cate_id: string

  @ApiProperty({
    example: '*/path/*.html',
    description: '文章解析后的html',
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string

  @ApiProperty({
    example: '*/path/*.md',
    description: '文章markdown文件源',
  })
  @IsNotEmpty()
  @IsString()
  readonly content_md: string
}
