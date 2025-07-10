import React, { useEffect, useState } from 'react';
import './Admin.css';

export default function Admin() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  useEffect(() => {
    fetch("https://project-data-3-wtva.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // Mark order as ready (PATCH)
  const handleReady = async (id) => {
    try {
      const res = await fetch(`https://project-data-3-wtva.onrender.com/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'ready' })
      });

      if (res.ok) {
        const updated = await res.json();
        setOrders(prev =>
          prev.map(order => (order.id === id ? updated : order))
        );
        alert("Message to user: Your order is ready!");
      } else {
        alert("Failed to mark ready.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Delete after collected
  const handleCollected = async (id) => {
    if (!window.confirm("Confirm collection? This will delete the order.")) return;

    try {
      const res = await fetch(`https://project-data-3-wtva.onrender.com/orders/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setOrders(prev => prev.filter(order => order.id !== id));
      } else {
        alert("Failed to delete.");
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Panel - Orders</h2>
      </div>

      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders to show.</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h4>Order #{order.id} - {new Date(order.orderedAt).toLocaleString()}</h4>
              <p>Status: <strong>{order.status || "pending"}</strong></p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity} = ₹{item.quantity * item.price}
                  </li>
                ))}
              </ul>
              <div className="order-actions">
                {order.status !== "ready" && (
                  <button className="admin-button ready-button" onClick={() => handleReady(order.id)}>
                    Mark Ready
                  </button>
                )}
                <button className="admin-button delete-button" onClick={() => handleCollected(order.id)}>
                  Mark Collected
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
