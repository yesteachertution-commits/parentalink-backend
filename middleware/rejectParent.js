const rejectParent = (req, res, next) => {
  if (req.user?.role === "parent") {
    return res.status(403).json({ message: "Parents cannot access this resource" });
  }
  return next();
};

module.exports = rejectParent;
