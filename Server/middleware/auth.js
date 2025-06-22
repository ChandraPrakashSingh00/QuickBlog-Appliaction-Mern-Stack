const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Optional: attach user data to request
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = auth;
