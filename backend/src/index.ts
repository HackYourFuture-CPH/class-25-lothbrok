import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '../', '.env') });
import app from './app';

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.warn(`⚡️[server]: Server is running at http://localhost:${port}`);
});
