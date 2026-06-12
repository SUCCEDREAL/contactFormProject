import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="welcome">
        <h1>Welcome to my <br />Contact Form Project</h1>
      </div>

      <div className="buttonContainer">
        <button className="signupButton">
          <Link to="/Signup">Get Started with Signup</Link>
        </button>
        <br />

        <button className="loginButton">
          <Link to="/Login">Go to Login Instead</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
