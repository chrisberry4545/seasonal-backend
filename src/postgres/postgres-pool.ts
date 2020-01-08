import { DB_CONNECTION_STRING } from '../config';
import { Pool } from 'pg';
import { errorLogger } from '../logger/logger';

export const pool = new Pool({
  connectionString: DB_CONNECTION_STRING
});

pool.on('error', (err) => {
  errorLogger.log('error', 'Unexpected error on idle client', err);
  process.exit(-1);
});
