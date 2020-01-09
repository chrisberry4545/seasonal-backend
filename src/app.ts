import express from 'express';
import helmet from 'helmet';
import {
  cors
} from './middleware/cors';
import { v2Api } from './api/v2';

const app = express();

app.use(cors);
app.use(helmet());

app.use('/', v2Api());

export {
  app
};
