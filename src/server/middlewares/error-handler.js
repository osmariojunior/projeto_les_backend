const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send({
    name: err.name,
    message: err.message,
    status: err.statusCode,
  });
  next(err);
};

module.exports = errorHandler;
