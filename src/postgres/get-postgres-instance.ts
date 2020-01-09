import { PoolClient } from 'pg';
import { pool } from './postgres-pool';

export const getPostgresInstance = async (): Promise<PoolClient> =>
  pool.connect();
