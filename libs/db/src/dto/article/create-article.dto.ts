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

  @ApiProperty({
    example: '使用nestJs',
    description: '描述/摘要',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string

  @ApiProperty({
    example: '# Nestjs...',
    description: 'markdown源文件',
  })
  @IsNotEmpty()
  @IsString()
  readonly markdown: string

  @ApiProperty({
    example: '<h1>Nestjs...</h1>',
    description: 'md转换后的html',
  })
  @IsNotEmpty()
  @IsString()
  readonly html: string

  @ApiProperty({
    example: '2022-1-1 21:00',
    description: '文章创建的时间',
  })
  @IsString()
  readonly createdAt: string

  @ApiProperty({
    example: '2022-1-1 22:00',
    description: '文章更新的时间',
  })
  @IsString()
  readonly updatedAt: string
}
