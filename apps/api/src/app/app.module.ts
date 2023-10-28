import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbContextModule } from './db-context/db-context.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbContextModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
