import { DB_CONNECTION_STRING } from '../config';
import { Client } from 'pg';
import { errorLogger } from '../logger/logger';

let client: Client;

export const getPostgresInstance = async () => {
  if (!client) {
    try  {
      client = new Client(DB_CONNECTION_STRING);
      await client.connect();
    } catch (e) {
      errorLogger.log('error', 'Failed to connect to database...', e);
    }
  }
  return client;
};
