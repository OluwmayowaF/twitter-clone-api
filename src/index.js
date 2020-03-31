require('dotenv').config();

const express = require('express');
// const logger = require('morgan');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
// const router = express.Router(); // Setup express router
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Datatbase Connected Successfully'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server now listening at localhost:${port}`);
});

module.exports = app;
