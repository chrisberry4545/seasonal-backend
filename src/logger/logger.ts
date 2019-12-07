import { createLogger } from 'winston';

export const errorLogger = createLogger({
  level: 'error'
});
