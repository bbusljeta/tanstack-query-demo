import { ApiProperty } from '@nestjs/swagger';
import { Accounts } from '../../db-context/schema';

export class AccountDto implements Accounts {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
