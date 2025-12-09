import jwt from "jsonwebtoken";

export const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, "SECRET123", (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    req.user = decoded;
    next();
  });
};
