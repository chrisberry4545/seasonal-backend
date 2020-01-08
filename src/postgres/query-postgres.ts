import { getPostgresInstance } from './get-postgres-instance';
import { QueryResult } from 'pg';

const snakeToCamelCase = (str: string) =>
  str.replace(/(_\w)/g, (m) => m[1].toUpperCase());

const objectCasingToCamelCase = <T>(obj: T): T =>
  Object.entries(obj).reduce((newObj, [key, value]) => ({
    ...newObj,
    [snakeToCamelCase(key)]: value
  }), {} as T);

export const queryPostgres = async <T>(
  query: string,
  values?: any[]
): Promise<QueryResult<T>> => {
  const db = await getPostgresInstance();
  const result = await db.query<T>({ text: query, values });
  db.release();
  return {
    ...result,
    rows: result.rows && result.rows.map(objectCasingToCamelCase)
  };
};
