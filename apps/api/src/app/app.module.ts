import { Module } from '@nestjs/common';

import { DbContextModule } from './db-context/db-context.module';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbContextModule,
    AccountsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
