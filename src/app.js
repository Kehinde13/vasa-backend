import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Define your allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://vasa-eight.vercel.app'
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS error: origin ${origin} not allowed`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Important: use same config


app.use((req, res, next) => {
  console.log('Incoming Origin:', req.headers.origin);
  next();
});


app.use(json());
app.use(morgan('dev'));

// MongoDB connection
const CONNECTION = process.env.CONNECTION;
mongoose
  .connect(CONNECTION)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('VAsA Backend is running');
});

app.use('/api/auth', authRoutes);

export default app;
