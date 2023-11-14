import { ApiProperty } from '@nestjs/swagger';

export class CursorResponse<T> {
  @ApiProperty()
  cursor: number;
  @ApiProperty()
  data: T[];

  constructor(data: T[], cursor: number) {
    this.data = data;
    this.cursor = cursor;
  }
}
