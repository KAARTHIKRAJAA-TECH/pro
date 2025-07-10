import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { Link } from 'react-router-dom';


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Check if user already exists
      const checkRes = await fetch(`https://project-data-3-wtva.onrender.com/users?email=${email}`);
      const existingUsers = await checkRes.json();
      if (existingUsers.length > 0) {
        alert("User already exists");
        return;
      }

      // Add new user
      await fetch("https://project-data-3-wtva.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      alert("Signup successful!");
      navigate("/"); // ✅ Navigate after signup
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}
