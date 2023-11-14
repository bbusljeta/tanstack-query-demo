import { ApiProperty } from '@nestjs/swagger';
import { Companies } from '../entities/company.entity';

export class CompanyDto implements Companies {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  slogan: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
