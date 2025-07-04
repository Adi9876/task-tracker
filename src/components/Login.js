import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("username", username);
      onLogin(username);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="login-input"
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}
