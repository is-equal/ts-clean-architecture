import { NestFactory } from '@nestjs/core';
import { createConnection } from 'typeorm';
import { AppModule } from './app.module';
import ormconfig from './ormconfig';

async function bootstrap(): Promise<void> {
  await createConnection(ormconfig);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap().catch(console.error);
