import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { DbContextModule } from '../db-context/db-context.module';

@Module({
  imports: [DbContextModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
