require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;

const app = express();
const router = express.Router(); // Setup express router
const db = process.env.MONGO_URI;
const port = process.env.PORT;

const routes = require('./routes/index');

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
app.get('/', (req, res) => {
  res.send('Hello World');
});


app.use('/api/v1', routes(router));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server now listening at localhost:${port}`);
});

module.exports = app;
