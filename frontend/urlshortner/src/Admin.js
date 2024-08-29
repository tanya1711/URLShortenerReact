import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const submitLoginForm = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage('Please enter both email and password.');
      setMessageType('error');
      return;
    }

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    const credentials = btoa(`${email}:${password}`);

    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const errorMessage = error.message || 'Invalid email or password';
        throw new Error(errorMessage);
      }

      const user = await response.json();
      setMessage('Login successful');
      setMessageType('success');

      sessionStorage.setItem('user', JSON.stringify(user));

      setTimeout(async () => {
        try {
          const postLoginResponse = await fetch('http://localhost:8081/getPostLogin', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${credentials}`
            }
          });

          if (!postLoginResponse.ok) {
            const error = await postLoginResponse.json().catch(() => ({}));
            throw new Error(error.message || 'Error loading adminpostlogin page');
          }

          navigate('/adminpostlogin');
        } catch (error) {
          setMessage(error.message);
          setMessageType('error');
        }
      }, 2000);
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    }
  };

  return (
    <div className="Admin-wrapper">
      <div className="topSide">
        <div className="parent-login">
          <form className="login-card" onSubmit={submitLoginForm}>
            <h1>Admin Login</h1>
            <div className="userInput">
              <input
                type="text"
                id="login-email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="userInput">
              <input
                type="password"
                id="login-password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="btn-login">Login</button>
            </div>
            <div id="login-message" className={`message ${messageType}`}>
              {message}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
