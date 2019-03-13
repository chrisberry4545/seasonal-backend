require('env-yaml').config();

import {
  app
} from './src/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});

process.on('SIGINT', () => {
  // This is to avoid EADDRINUSE issues with Nodemon
  console.log('Exiting');
  process.exit();
});
