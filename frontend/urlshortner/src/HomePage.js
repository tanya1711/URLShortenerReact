import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();


  const redirectToLogin = () => {
    navigate('/login');
  };


  const redirectToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="HomePage-wrapper">
      <header className="header">
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">About BigShyft</a>
          <a href="#">Support</a>
          <a href="#">Pricing</a>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>

      <div className="parent-login">
        <form className="login-card">
          <h1>BigShyft URL Shortner</h1>
          <div>
            <button type="button" className="btn-login" onClick={redirectToLogin}>
              Login
            </button>
            <button type="button" className="btn-login" onClick={redirectToSignUp}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
