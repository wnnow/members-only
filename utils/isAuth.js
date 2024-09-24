function authMiddleware(req, res, next) {
  const user = req.user;
  if (user) {
    req.isUser = true;
    req.isMember = user.membership_status;
    req.isAdmin = user.is_admin;
  } else {
    req.isUser = false;
    req.isMember = false;
    req.isAdmin = false;
  }
  next();
}

module.exports.authMiddleware = authMiddleware;
