import { createLogger, transports } from 'winston';

export const errorLogger = createLogger({
  level: 'error',
  transports: [
    new transports.Console()
  ]
});
