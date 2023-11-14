import { Inject, Injectable } from '@nestjs/common';
import { DB_CONTEXT } from '../db-context/db-context.module';
import { Database } from '../db-context/db-context';
import { companies } from './entities/company.entity';
import { gt } from 'drizzle-orm';

@Injectable()
export class CompaniesService {
  constructor(@Inject(DB_CONTEXT) private readonly dbContext: Database) {}

  async findAll(limit: number, cursor: number) {
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
      .limit(limit)
      .where(gt(companies.id, cursor));

    const last = data[data.length - 1];

    return {
      data,
      cursor: last?.id ?? 0,
    };
  }
}
