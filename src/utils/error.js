class ErrorHandler extends Error {
  constructor(statusCode, message, hint) {
    super();
    this.name = 'ErrorHandler';
    Error.captureStackTrace(this, ErrorHandler);
    this.statusCode = statusCode;
    this.message = message;
    this.hint = hint;
    console.log('Error', Error.captureStackTrace )
  }
}


const handleError = (err, res, next) => {
  const { statusCode, message, hint } = err;
  res.status(statusCode).json({
    status: 'error',
    message,
    hint,
  });
  next();
};

export {
  ErrorHandler, handleError,
};
