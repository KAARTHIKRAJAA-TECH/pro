// src/ConfirmationPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cart || [];
  const user = JSON.parse(localStorage.getItem("user"));

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) return alert("No items to confirm.");

    // Remove image property before sending
    const cleanedItems = cartItems.map(({ name, price, quantity }) => ({
      name,
      price,
      quantity
    }));

    try {
      const response = await fetch("https://project-data-3-wtva.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user?.id, // ⬅️ include userId to track user's order
          items: cleanedItems,
          orderedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        alert("Order placed successfully!");
        navigate("/profile"); // ⬅️ go to user profile page
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error while placing order.");
    }
  };

  return (
    <div className="confirmation-container">
  <h1>Order Confirmation</h1>
  {cartItems.length === 0 ? (
    <p>No items in cart.</p>
  ) : (
    <ul>
      {cartItems.map((item, index) => (
        <li key={index}>
          {item.name} × {item.quantity} = ₹{item.price * item.quantity}
        </li>
      ))}
    </ul>
  )}
  <button className="confirm-button" onClick={handleConfirmOrder}>Confirm</button>
</div>

  );
}
