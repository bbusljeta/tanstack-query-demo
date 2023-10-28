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
        const dbUser = configService.get('DB_USER');
        const dbPassword = configService.get('DB_PASSWORD');
        const dbName = configService.get('DB_NAME');
        const dbPort = configService.get('DB_PORT');
        const url = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?schema=public`;

        return new DbContext(url).build();
      },
    },
  ],
  exports: [DB_CONTEXT],
})
export class DbContextModule {}
