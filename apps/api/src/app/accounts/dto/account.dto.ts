import { ApiProperty } from '@nestjs/swagger';
import { Accounts } from '../entities/account.entity';

export class AccountDto implements Accounts {
  @ApiProperty()
  avatarUrl: string;
  @ApiProperty()
  id: number;
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
