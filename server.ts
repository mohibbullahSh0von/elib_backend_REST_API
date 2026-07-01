import { type Request, type Response, type NextFunction } from 'express';
import app from './src/app.js';

const port = process.env.PORT || 3000;

function testing() {
  console.log('testing');
}

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: 'Welcome to elib api for ebook store' });
});

app.listen(port, () => {
  console.log('The server is litening at port:', port);
});
