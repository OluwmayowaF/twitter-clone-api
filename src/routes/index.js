import { Router } from 'express';

import api from './api';
import ErrorHandler from '../utils/error';


const router = Router();


router.all('/', (req, res) => {
  res.render('pages/index');
});

router.use('/api/v1', api);

router.use((req, res) => {
  throw new ErrorHandler(404, `${req.method.toUpperCase()} Route ${req.url} Not Found!`);
});

// Global Error Handler
router.use((err, req, res, next) => {
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

export default router;
