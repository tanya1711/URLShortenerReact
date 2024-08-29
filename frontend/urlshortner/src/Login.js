import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'; // Updated CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate(); // Initialize navigate

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
          'Authorization': `Basic ${credentials}` // Fixed incorrect usage
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({})); // Catch JSON parsing error
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
            throw new Error(error.message || 'Error loading postlogin page');
          }

          navigate('/postlogin');
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
    <div className="Login-wrapper">
      <div className="topSide">
        <div className="parent-login">
          <form className="login-card" onSubmit={submitLoginForm}>
            <h1>Login</h1>
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
            <div className="signUp">
              New to BigShyft? <a href="/signup" className="sLink">Sign up now</a>
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

export default LoginPage;
