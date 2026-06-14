import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImg from "../assets/loginImage.png";
import {
  faEnvelope,
  faLock,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://contactform-backend-c2wa.onrender.com/api/v1/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      console.log("Login success:", data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard"); // or wherever you want post-login
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-text">
        <FontAwesomeIcon icon={faDoorOpen} className="login-icon" />
        <br />
        <h2>Welcome Back!</h2>
        <p>Please enter your credentials to log in.</p>
      </div>

      <div className="loginSection">
        <div className="loginTextTwo">
          <h3>Login to Your Account</h3>
          <img src={logoImg} alt="Login" className="logoImg" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="login-group">
            <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-group">
            <FontAwesomeIcon icon={faLock} className="form-icon" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="loginBtn">
            <button type="submit">Login</button>
            <br />
          </div>

          <div className="forgetText">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
