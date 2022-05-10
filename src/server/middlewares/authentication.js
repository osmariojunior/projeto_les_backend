const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided." });
  }

  const splitted = token.split(" ").pop();

  try {
    const decoded = await jwt.verify(splitted, process.env.AUTH_SECRET);
    req.identification = decoded;
    next();
  } catch (err) {
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
};

module.exports = authentication;
