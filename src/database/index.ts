import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';

dotenv.config();

const host = process.env.MONGODB_HOST ?? 'localhost';
const port = parseInt(process.env.MONGODB_PORT ?? '5432', 10);
const username = process.env.MONGODB_USER ?? 'root';
const password = process.env.MONGODB_PASSWORD;
const database = process.env.MONGODB_DB;

if (!password) {
  console.error('Error: MONGODB_PASSWORD environment variable is not set.');
  process.exit(1);
}

const mongoUri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

export const Database = MongooseModule.forRoot(mongoUri);
export * from './schemas'