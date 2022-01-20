import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryDto {
  @ApiProperty({
    example: 'NestJs',
    description: '文章类别',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string
  @ApiProperty({
    example: '2022-1-19 16:10:21',
    description: '类别创建的时间',
  })
  @IsNotEmpty()
  @IsString()
  readonly createAt: string

  @ApiProperty({
    example: '2022-1-19 16:10:21',
    description: '类别更新的时间',
  })
  @IsNotEmpty()
  @IsString()
  readonly updateAt: string
}
