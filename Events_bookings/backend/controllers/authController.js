import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(query, [name, email, hash, role || "user"], (err) => {
    if (err) return res.status(400).json({ error: err });
    res.json({ message: "User registered successfully!" });
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], (err, users) => {
    if (err || users.length === 0) return res.status(404).json({ error: "User not found" });

    const user = users[0];

    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET123", { expiresIn: "1d" });

    res.json({ message: "Login successful", token, role: user.role });
  });
};
