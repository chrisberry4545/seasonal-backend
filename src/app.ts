import express from 'express';
import helmet from 'helmet';
import {
  cors
} from './middleware/cors';

import {
  seasonApi
} from './api/season-api';

const app = express();

app.use(cors);
app.use(helmet());

app.use(`/${process.env.SEASON_DATA_ENDPOINT}`, seasonApi());

export {
  app
};
