import { getPostgresInstance } from './get-postgres-instance';
import { QueryResult } from 'pg';

export const queryPostgres = async <T>(
  query: string
): Promise<QueryResult<T>> => {
  const db = await getPostgresInstance();
  return db.query<T>(query);
};
