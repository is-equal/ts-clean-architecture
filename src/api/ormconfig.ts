import path from 'path';
import { ConnectionOptions } from 'typeorm';

const DatabaseDataSourceDirectory = path.resolve(__dirname, '..', '..', 'data-sources', 'database');

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'database',
  username: 'user',
  password: 'pass',
  database: 'development',
  synchronize: true,
  logging: false,
  entities: [path.join(DatabaseDataSourceDirectory, 'entities', '*.entity.js')],
  migrations: [path.join(DatabaseDataSourceDirectory, 'migrations', '*.js')],
  subscribers: [path.join(DatabaseDataSourceDirectory, 'subscribers', '*.js')]
};

export default config;
