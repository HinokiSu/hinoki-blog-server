import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateStateDto {
  @ApiProperty({
    example: '88',
    description: '浏览量',
  })
  @IsNotEmpty()
  readonly pageviews: number

  @ApiProperty({
    example: '2022-1-19',
    description: '当天的日期',
  })
  @IsNotEmpty()
  @IsString()
  readonly date: string
}
