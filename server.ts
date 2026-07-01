// import 'dotenv/config';
import app from './src/app.js';
import { config } from './src/config/config.js';

const startServer = () => {
  const port = config.port;
  app.listen(port, () => {
    console.log('The server is listening at port:', port);
  });
};

//starting server.

startServer();
