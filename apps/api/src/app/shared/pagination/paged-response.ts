import { ApiProperty } from '@nestjs/swagger';

export class PagedResponse<T> {
  @ApiProperty()
  totalRows: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  data: T[];

  constructor(totalRows: number, totalPages: number, page: number, data: T[]) {
    this.totalRows = totalRows;
    this.totalPages = totalPages;
    this.data = data;
    this.page = page > 0 ? page : 1;
  }
}
