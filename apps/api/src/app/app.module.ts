import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbContextModule } from './db-context/db-context.module';

@Module({
  imports: [DbContextModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
