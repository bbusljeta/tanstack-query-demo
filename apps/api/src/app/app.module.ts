import { Module } from '@nestjs/common';

import { DbContextModule } from './db-context/db-context.module';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { DbContext } from './db-context/db-context';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbContextModule,
    AccountsModule,
  ],
  controllers: [],
  providers: [DbContext],
})
export class AppModule {}
