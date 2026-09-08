exports.roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied. Role '${req.user.role}' not allowed.` });
    }
    next();
  };
};
