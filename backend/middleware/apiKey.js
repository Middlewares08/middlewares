module.exports = function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'];

  if (!key || key !== process.env.LICENSE_API_KEY) {
    return res.status(401).json({ message: 'Invalid or missing API key' });
  }

  next();
};
