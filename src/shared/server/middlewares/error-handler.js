const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err);
  next(err);
};

module.exports = errorHandler;
