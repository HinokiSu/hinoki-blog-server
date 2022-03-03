import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    example: 'admin',
    description: '用户账户名称',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string

  @ApiProperty({
    example: 'password123',
    description: '用户密码',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string

  @ApiProperty({
    example: '2022-1-19 16:10:21',
    description: '用户创建的时间',
  })
  @IsNotEmpty()
  @IsString()
  readonly createAt: string

  @ApiProperty({
    example: '2022-1-19 16:10:21',
    description: '用户更新的时间',
  })
  @IsNotEmpty()
  @IsString()
  readonly updateAt: string
}
