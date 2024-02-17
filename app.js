require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');

// Other Packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Routers
const authRouter = require('./routes/authRoutes');

// Middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get('/', (req, res) => {
  res.send('e-commerce api');
});

app.get('/api/v1', (req, res) => {
  console.log(req.cookies);
  res.send('e-commerce api');
});

app.use('/api/v1/auth', authRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
