import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { DB_CONTEXT } from '../db-context/db-context.module';
import { Database } from '../db-context/db-context';
import { accounts } from './entities/account.entity';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class AccountsService {
  constructor(@Inject(DB_CONTEXT) private readonly dbContext: Database) {}

  create(createAccountDto: CreateAccountDto) {
    return this.dbContext
      .insert(accounts)
      .values({
        ...createAccountDto,
      })
      .returning();
  }

  async findAll(limit: number, offset: number) {
    const data = await this.dbContext
      .select({ count: sql<number>`COUNT(id)::int` })
      .from(accounts);

    const [row] = data;
    const res = await this.dbContext
      .select({
        id: accounts.id,
        firstName: accounts.firstName,
        lastName: accounts.lastName,
        email: accounts.email,
      })
      .from(accounts)
      .limit(limit)
      .offset(offset);

    return {
      totalRows: row.count,
      totalPages: Math.ceil(row.count / limit),
      data: res,
    };
  }

  findOne(id: number) {
    return this.dbContext.query.accounts.findFirst({
      where: (accounts, { eq }) => eq(accounts.id, id),
    });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.dbContext
      .update(accounts)
      .set(updateAccountDto)
      .where(eq(accounts.id, id));
  }

  remove(id: number) {
    return this.dbContext.delete(accounts).where(eq(accounts.id, id));
  }
}
