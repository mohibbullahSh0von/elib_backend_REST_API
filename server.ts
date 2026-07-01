import 'dotenv/config';
import app from './src/app.js';

const startServer = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('The server is listening at port:', port);
  });
};

//starting server.

startServer();
