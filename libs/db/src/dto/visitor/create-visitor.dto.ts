import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateVisitorDto {
  @ApiProperty({
    example: '张三',
    description: '用户昵称',
  })
  @IsNotEmpty()
  @IsString()
  readonly nickname: string

  @ApiProperty({
    example: '12345@gmail.com',
    description: '访问者的邮箱',
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string

  @ApiProperty({
    example: 'pwd12345',
    description: '访问者的密码',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string
}
