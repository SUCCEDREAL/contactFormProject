import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      const response = await Api.login({ email, password });
      if (response.token) {
        localStorage.setItem("token", response.token);
        alert("Login successful!");
        console.log("Login successful:", response);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
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
          <img
            src="../src/assets/loginImage.png"
            alt="Login"
            className="logoImg"
          />
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
