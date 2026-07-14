function errorHandler(error, _request, response, _next) {
  console.error(error);
  response.status(500).json({ error: 'Something went wrong while tending the dream archive.' });
}

module.exports = errorHandler;
