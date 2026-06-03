import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/chat");
  }

  function goToRegister() {
    navigate("/register");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>AI Voter Search</h1>

        <input type="email" placeholder="Email" className="auth-input" />

        <input type="password" placeholder="Password" className="auth-input" />

        <button className="primary-button" onClick={handleLogin}>
          Login
        </button>

        <button className="link-button" onClick={goToRegister}>
          Create Account
        </button>
      </div>
    </div>
  );
}
