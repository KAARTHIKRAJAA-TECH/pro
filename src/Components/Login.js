import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    try {
      // Check Admin
      const adminRes = await fetch(`https://project-data-3-wtva.onrender.com/admins?email=${email}&password=${password}`);
      const adminData = await adminRes.json();

      if (adminData.length > 0) {
        alert("Admin Login Successful");
        navigate("/admin");
        return;
      }

      // Check User
      const userRes = await fetch(`https://project-data-3-wtva.onrender.com/users?email=${email}&password=${password}`);
      const userData = await userRes.json();

     if (userData.length > 0) {
  alert("Welcome to my restaurant Venmathi ");
  localStorage.setItem("user", JSON.stringify(userData[0])); 
  navigate("/menu");
} else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
     <p>Don't have an account? <Link to="/signup">Sign up</Link></p>

    </div>
  );
}
