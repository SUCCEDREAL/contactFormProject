import express from "express";
import { signup, login } from "../controllers/authController.js";
import { sendEmail } from "../middlewares/email.js";

export const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/newUser", sendEmail, (req, res) => {
  res
    .status(200)
    .json({ message: `Welcome to our Page ${signupPage.fullName}!` });
  // Implementation for getting new user data
});

export default router;
