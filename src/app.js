import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('VAsA Backend is running');
});

app.use('/api/auth', authRoutes);

export default app;
