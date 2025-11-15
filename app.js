import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import indexRouter from './routers/main.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); // parse form bodies
app.use(express.json()); // parse JSON

app.use(express.static('public'));
app.use('/', indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
