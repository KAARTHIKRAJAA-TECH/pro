
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

export default function UserProfile() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/"); // not logged in, go back to login
      return;
    }

    fetch("https://project-data-3-wtva.onrender.com/orders?userId=" + user.id)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="profile-container">
  <div className="profile-header">
    <h2>Welcome, {user?.email}</h2>
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  </div>

  <h3 className="orders-title">Your Orders:</h3>

  {orders.length === 0 ? (
    <p>No orders placed yet.</p>
  ) : (
    orders.map((order, index) => (
      <div key={index} className="order-card">
        <p><strong>Date:</strong> {new Date(order.orderedAt).toLocaleString()}</p>
        <ul>
  {order.items.map((item, idx) => (
    <li key={idx}>
      {item.name} × {item.quantity} = ₹{item.quantity * item.price}
    </li>
  ))}
</ul>

{order.status === "ready" && (
  <p style={{ color: 'green', fontWeight: 'bold' }}>✅ Order #{order.id} is ready for pickup!</p>
)}

      </div>
    ))
  )}
</div>

  );
}
