import { ApiProperty } from '@nestjs/swagger';
import { Accounts } from '../../db-context/schema';

export class CreateAccountDto implements Partial<Accounts> {
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}
