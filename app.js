require('dotenv').config();

const express = require('express');
// const logger = require('morgan');
// const bodyParser = require('body-parser');

const app = express();
// const router = express.Router(); // Setup express router

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server now listening at localhost:${port}`);
});

module.exports = app;
