import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DbContext } from './db-context';
import { accounts } from '../accounts/entities/account.entity';
import { faker } from '@faker-js/faker';
import { config } from 'dotenv';

config();

const { DB_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, DB_PORT } =
  process.env;

async function seed() {
  const app = await NestFactory.create(AppModule);
  const dbContext = app.get(DbContext);
  const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=public`;

  const db = dbContext.build(connectionString);

  await db.transaction(async (trx) => {
    Array.from({ length: 200 }).map(async () => {
      await db.insert(accounts).values({
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatarUrl: faker.image.avatar(),
      });
    });
  });
}

seed();
