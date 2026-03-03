function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || '服务器内部错误';

  console.error(`[Error] ${statusCode} - ${message}`);

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
    },
  });
}

module.exports = errorHandler;
