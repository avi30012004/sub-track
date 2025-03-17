import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import subscriptionRouter from './routes/subcription.route.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middleware/arcjet.middleware.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use(errorMiddleware);


app.get('/', (req, res) => {
  res.send('Welcome to the subscription service'); // Fix response format
});

connectDB().then(() => {
  app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("MongoDB Connection Error:", err);
  process.exit(1);
});

export default app;
