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
}
