import { Inject, Injectable } from '@nestjs/common';
import { DB_CONTEXT } from '../db-context/db-context.module';
import { Database } from '../db-context/db-context';
import { companies } from './entities/company.entity';
import { gt } from 'drizzle-orm';

@Injectable()
export class CompaniesService {
  constructor(@Inject(DB_CONTEXT) private readonly dbContext: Database) {}

  async findAll(limit: number, cursor: number) {
    const computedLimit = limit + 1;
    const data = await this.dbContext
      .select({
        id: companies.id,
        name: companies.name,
        slogan: companies.slogan,
        createdAt: companies.createdAt,
        updatedAt: companies.updatedAt,
      })
      .from(companies)
      .orderBy(companies.id)
      .limit(computedLimit)
      .where(gt(companies.id, cursor));

    // -2 because we are fetching one extra record (limit + 1) to determine if there is a next page
    const last = data[data.length - 2];
    const nextCursor = data.length < computedLimit ? null : last.id;
    const filteredData = data.slice(0, limit);

    return {
      data: filteredData,
      cursor: nextCursor,
    };
  }
}
