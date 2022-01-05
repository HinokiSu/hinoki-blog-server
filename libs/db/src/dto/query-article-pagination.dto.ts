import { IsOptional, IsPositive } from 'class-validator'
export class PaginationQueryArticleDto {
  @IsOptional()
  @IsPositive()
  limit: number

  @IsOptional()
  @IsPositive()
  offset: number
}
