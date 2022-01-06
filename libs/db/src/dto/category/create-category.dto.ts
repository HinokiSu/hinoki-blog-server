import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

// 请求有效载荷
export class CreateCategoryDto {
  @ApiProperty({
    example: 'NestJs',
    description: '文章类别',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string
}
