// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './Components/Admin';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import Menu from './Components/Menu'
import ConfirmationPage from './Components/ConfirmationPage';
import UserProfile from './Components/UserProfile';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
