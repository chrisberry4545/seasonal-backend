import { shutdownPostgresInstance } from '../src/postgres';

afterAll(async () => await shutdownPostgresInstance());
