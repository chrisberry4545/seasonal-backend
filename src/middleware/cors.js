const allowedOrigins = require('./allowed-origins.json');

const isAllowedOrigin = (origin) => {
  return origin && (
    origin.includes('localhost') ||
    allowedOrigins.includes(origin)
  );
};

// istanbul ignore next
module.exports = (req, res, next) => {
  const requestOrigin = req.get('origin');
  if (isAllowedOrigin(requestOrigin)) {
    res.header('Access-Control-Allow-Origin', requestOrigin);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header(
      'Access-Control-Allow-Credentials',
      true
    );
  }
  next();
};
