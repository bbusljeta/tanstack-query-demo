import { ApiProperty } from '@nestjs/swagger';
import { Accounts } from '../entities/account.entity';

export class CreateAccountDto implements Partial<Accounts> {
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  avatarUrl: string;
}
