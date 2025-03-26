import express from "express";
import { AuthService } from "./auth.service";

const router = express.Router();

const authService = new AuthService();

router.post("/register", async (req, res) => {
  try {
    const newUser = await authService.register(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Register error:", err);
    res.status(400).json("Registration failed");
  }
});

router.post("/login", async (req, res) => {
  try {
    const token = await authService.login(req.body);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login successful", name: req.body.name });
  } catch (err) {
    console.error("Login error:", err);
    res.status(401).json("Invalid credentials");
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

export const authRouter = router;
