import express from 'express';
import 'express-async-errors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index';

require('dotenv').config();

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

const db = stage.DBHost;

export default {
  start({ port = stage.port } = {}) {
    // Connect to MongoDB
    mongoose
      .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
      .then(() => console.log('Database Connected Successfully'))
      .catch((err) => console.log(err));


    const app = express();
    // Configure Body Parser
    app.use(bodyParser.json({ type: 'application/json' }));
    app.use(bodyParser.urlencoded({
      extended: true,
    }));
    if (environment !== 'production') {
      app.use(logger('dev'));
    }
    app.set('view engine', 'ejs');
    app.use(cors());
    app.use(routes);

    
    return new Promise((resolve) => {
      const server = app.listen(port, () => {
        const originalClose = server.close.bind(server);
        server.close = () => new Promise((resolveClose) => {
          // promisify server.close() to close gracefully and notify via resolveClose
          originalClose(resolveClose);
          console.log('Server Closing');
        });
      });
      resolve(server);
    });
  },
};
