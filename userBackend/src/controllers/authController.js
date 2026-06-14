import { authModel } from "../models/authModel.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../middlewares/email.js";
import jwt from "jsonwebtoken";

// SIGNUP NEW USER
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // TO CHECK EXISTING USER
    const userExists = await authModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = await authModel.create({
    //   fullName,
    //   email,
    //   password: hashedPassword,
    // });

    // TO CREATE THE NEW USER
    const newUser = await authModel.create({
      fullName,
      email,
      password,
    });

    await sendEmail({
      to: newUser.email,
      subject: "SIGNING UP TO OUR CONTACT PROJECT",
      html: `
        <h2>Hello ${newUser.fullName}</h2>
        <p>Welcome to our Ajose Ezekiel Olayemi Contact Prject!</p>
        <p>Kindly go back to the page to login and explore moore..</p> 
        <br />
        <p>You are welcome onboard!</p>
      `,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res
      .status(500)
      .json({ message: "Error occurred while accessing signup page", error });
  }
};

// login User
export const login = async (req, res) => {
  // ← added export, renamed to match router
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
      console.log(message);
    }

    // find user by email
    const user = await authModel.findOne({ email });
    if (!user) {
      console.log("USER:", user);
      console.log("STORED HASH:", user?.password);
      console.log("HASH LENGTH:", user?.password?.length);
      console.log("PLAIN PASSWORD:", password);
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("MATCH:", isMatch);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRETPIN,
      {
        expiresIn: "1d",
      },
    );

    //  sending of token to user
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // save token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",

      user: {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
      },
      token,
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res
      .status(500)
      .json({ message: "Error occurred while accessing login page", error });
  }
};

// log out user
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logout successful",
  });
};

export const allusers = async (req, res) => {
  try {
    const getalluser = await User.find();
    res.status(200).json({ message: "all users fetched", getalluser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
