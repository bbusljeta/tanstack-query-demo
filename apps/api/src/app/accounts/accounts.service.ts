import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { DB_CONTEXT } from '../db-context/db-context.module';
import { Database } from '../db-context/db-context';
import { accounts } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(@Inject(DB_CONTEXT) private readonly dbContext: Database) {}
  create(createAccountDto: CreateAccountDto) {
    return this.dbContext.insert(accounts).values({
      ...createAccountDto,
    });
  }

  findAll(limit: number, offset: number) {
    return this.dbContext.query.accounts.findMany({ limit, offset });
  }

  findOne(id: number) {
    return this.dbContext.query.accounts.findFirst({
      where: (accounts, { eq }) => eq(accounts.id, id),
      orderBy: (accounts, { asc }) => [asc(accounts.id)],
    });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
