import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbContext } from './db-context';

export const DB_CONTEXT = Symbol('DB_CONTEXT');

@Module({
  providers: [
    {
      provide: DB_CONTEXT,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const dbHost = configService.get('DB_HOST');
        const dbUser = configService.get('POSTGRES_USER');
        const dbPassword = configService.get('POSTGRES_PASSWORD');
        const dbName = configService.get('POSTGRES_DB');
        const dbPort = configService.get('DB_PORT');
        const url = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
        return new DbContext().build(url);
      },
    },
  ],
  exports: [DB_CONTEXT],
})
export class DbContextModule {}
