import app from './src/app.js';
import { config } from './src/config/config.js';
import conncectDB from './src/config/db.js';

const startServer = async () => {
  await conncectDB();

  const port = config.port;
  app.listen(port, () => {
    console.log('The server is listening at port:', port);
  });
};

//starting server.
startServer();
