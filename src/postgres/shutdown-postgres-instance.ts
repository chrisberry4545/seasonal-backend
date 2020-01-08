import { pool } from './postgres-pool';

export const shutdownPostgresInstance = async (): Promise<void> =>
  pool.end();
