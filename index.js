import serverless from 'serverless-http';
import app from './src/app.js';


// Wrap the Express app
const handler = serverless(app);

export default handler;
