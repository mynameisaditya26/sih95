exports.errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  if (err.code === 11000) { statusCode = 400; message = 'Duplicate field value entered'; }
  if (err.name === 'ValidationError') { statusCode = 400; message = Object.values(err.errors).map(v => v.message).join(', '); }
  if (err.name === 'JsonWebTokenError') { statusCode = 401; message = 'Invalid token'; }
  res.status(statusCode).json({ success: false, message, stack: process.env.NODE_ENV === 'production' ? null : err.stack });
};
