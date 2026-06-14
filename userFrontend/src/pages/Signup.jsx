import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import signupImg from "../assets/signup.png";
import googleLogo from "../assets/google_logo.png";
import appleLogo from "../assets/Apple_logo.png";
import {
  faCircleCheck,
  faUser,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        "https://contactform-backend-c2wa.onrender.com/api/v1/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      console.log("Signup success:", data);
      console.log("Signup success:", data);
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="header-signup">
          <div className="headerImg">
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>

          <div className="imgText">
            <h2>User Sign-up Page</h2>
          </div>

          <div className="headerTwo">
            <p>
              Already have an account? <a href="/login">Sign-In</a>
            </p>
          </div>
        </div>

        <div className="signupImage">
          <img src="../src/assets/signup.png" alt="Signup" />
        </div>
        <div className="createText">
          <h1>Create your account </h1>
          <p>Let's get you started with your new account!</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <p className="terms">
            <input type="checkbox" id="terms" name="terms" required /> By
            signing up, you agree to our <a href="/terms">Terms of Service</a>{" "}
            and <a href="/privacy">Privacy Policy</a>.
          </p>

          <div className="createBtn">
            <button className="submit" type="submit">
              Create Account
            </button>
          </div>
        </form>

        <div className="altSignUp">
          <div className="line">
            <hr />
          </div>

          <div className="altText">
            <p>or sign up with</p>
          </div>

          <div className="line">
            <hr />
          </div>
        </div>

        <div className="altlogo">
          <div className="googleLogo">
            <button className="googleBtn">
              <img
                src="../src/assets/google_logo.png"
                alt="Google"
                className="google"
              />{" "}
              <p className="googleText">Google</p>
            </button>
          </div>

          <div className="appleLogo">
            <button className="appleBtn">
              <img
                src="../src/assets/Apple_logo.png"
                alt="Apple"
                className="apple"
              />{" "}
              <p className="appleText">Apple</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
