import express from 'express';
import helmet from 'helmet';
import {
  cors
} from './middleware/cors';

import {
  v1Api
} from './api/v1';

const app = express();

app.use(cors);
app.use(helmet());

app.use('/', v1Api());

export {
  app
};
