import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CursorQuery {
  @ApiProperty()
  @ApiPropertyOptional()
  @IsInt()
  @Type(() => Number)
  cursor: number = 0;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsInt()
  @Min(10)
  @Type(() => Number)
  private readonly pageSize: number = 20;

  get limit() {
    return this.pageSize;
  }
}
