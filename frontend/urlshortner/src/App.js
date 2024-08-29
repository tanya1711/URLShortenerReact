import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import PostLogin from './PostLogin';
import Admin from './Admin';
import AdminPostLogin from './AdminPostLogin';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/postlogin" element={<PostLogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/adminpostlogin" element={<AdminPostLogin />} />
    </Routes>
  );
}

export default App;

