import { Module } from '@nestjs/common';

import { DbContextModule } from './db-context/db-context.module';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { DbContext } from './db-context/db-context';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbContextModule,
    AccountsModule,
    CompaniesModule,
  ],
  controllers: [],
  providers: [DbContext],
})
export class AppModule {}
