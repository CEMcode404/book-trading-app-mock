module.exports = (req, res, next) => {
  const allowedPaths = [
    "/signup",
    "/login",
    "/account",
    "/transaction",
    "/policies",
    "/reviews",
    "/search-results",
  ];
  if (
    allowedPaths.filter((path) => path === req.path).length > 0 ||
    req.path === "/"
  )
    next();
  else {
    return res.status(404).end();
  }
};
