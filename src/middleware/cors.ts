import allowedOrigins from './allowed-origins.json';

import {
  Request,
  Response,
  NextFunction
} from 'express';

const isAllowedOrigin = (origin: string | undefined) => {
  return origin && (
    origin.includes('localhost') ||
    (allowedOrigins as string[]).includes(origin)
  );
};

export const cors = (req: Request, res: Response, next: NextFunction) => {
  const requestOrigin = req.get('origin');
  if (isAllowedOrigin(requestOrigin)) {
    res.header('Access-Control-Allow-Origin', requestOrigin);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header(
      'Access-Control-Allow-Credentials',
      'true'
    );
  }
  next();
};
