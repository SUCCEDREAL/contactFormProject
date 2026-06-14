export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await authModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await authModel.create({
      fullName,
      email,
      password,
    });

    try {
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
    } catch (emailErr) {
      console.error("EMAIL SEND FAILED:", emailErr.message);
    }

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res
      .status(500)
      .json({
        message: "Error occurred while accessing signup page",
        error: error.message,
      });
  }
};
