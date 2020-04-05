import express from 'express';
import 'express-async-errors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes/index';
import ErrorHandler from './utils/error';

require('dotenv').config();

const environment = process.env.NODE_ENV;

const app = express();
const router = express.Router(); // Setup express router

const http = require('http').Server(app);
const io = require('socket.io')(http);
const stage = require('./config')[environment];

const db = stage.DBHost;
const { port } = stage;


// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Database Connected Successfully'))
  .catch((err) => console.log(err));

// Configure Body Parser
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({
  extended: true,
}));

if (environment !== 'production') {
  app.use(logger('dev'));
}
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index');
});


app.use('/api/v1', routes(router));

// Global Error Handler
app.use((err, req, res, next) => {
  const response = {
    status: 'error',
    message: err.message,
    hint: err.hint,
  };
  if (process.env.NODE_ENV === 'development' && !(err instanceof ErrorHandler)) {
    // Unknown server error. Response with stack trace for easier debugging
    response.stack = err.stack;
  }
  return res.status(err.status || 500).json(response);
});

io.on('connection', () => {
  console.log('a user is connected');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server now listening at localhost:${port}`);
});

module.exports = app;
