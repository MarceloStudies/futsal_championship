function authenticateToken(req, res, next) {
  const authKey = req.headers['x-auth-key'];

  if (authKey == null || authKey !== 'teste') {
    return res.sendStatus(403);
  }

  next();
}


module.exports = authenticateToken;


