import serverless from 'serverless-http';
import app from '../src/app.js';
import connectDB from '../src/config/db.js';

connectDB();

// Wrap the Express app
const handler = serverless(app);

export default handler;
