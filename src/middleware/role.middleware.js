module.exports = (allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.userRole)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions",
        });
      }
      next();
    };
  };
  