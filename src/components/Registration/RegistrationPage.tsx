import { useNavigate } from "react-router-dom";
import "./../Login/LoginPage.css";

export default function RegistrationPage() {
  const navigate = useNavigate();

  function handleSignup() {
    throw new Error("Function not implemented.");
  }

  function goBack() {
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>

        <input type="text" placeholder="First Name" className="auth-input" />

        <input type="text" placeholder="Last Name" className="auth-input" />

        <input type="email" placeholder="Email" className="auth-input" />

        <input type="text" placeholder="Phone Number" className="auth-input" />

        <input type="password" placeholder="Password" className="auth-input" />

        <input
          type="password"
          placeholder="Confirm Password"
          className="auth-input"
        />

        <button className="primary-button" onClick={handleSignup}>
          Sign Up
        </button>

        <button className="link-button" onClick={goBack}>
          Back
        </button>
      </div>
    </div>
  );
}
