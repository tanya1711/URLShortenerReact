import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!name || !email || !password) {
      setError('Please enter all the fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setMessage('Sign Up Successful. Redirecting in 5 seconds.');

      let countdown = 5;
      const interval = setInterval(() => {
        countdown--;
        setMessage(`Sign Up Successful. Redirecting in ${countdown} seconds.`);
        if (countdown === 0) {
          clearInterval(interval);
          navigate('/login'); // Redirect to login page
        }
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setError('Signup failed.');
    }
  };

  return (
    <div className="SignUp-wrapper">
      <div className="topSide">
        <div className="parent-login">
          <form id="signup-form" className="login-card" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="userInput">
              <input
                type="text"
                name="name"
                id="signup-name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={error && !name ? 'error' : ''}
              />
            </div>
            <div className="userInput">
              <input
                type="text"
                name="email"
                id="signup-email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error && !email ? 'error' : ''}
              />
            </div>
            <div className="userInput">
              <input
                type="password"
                name="password"
                id="signup-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error && !password ? 'error' : ''}
              />
            </div>
            <div>
              <button type="submit" className="btn-login">Sign Up</button>
            </div>
            <div className="signUp">
              Already registered? <a href="/login" className="sLink">Login</a>
            </div>
            {error && <div className="message error">{error}</div>}
            {message && <div id="signup-message" className="message">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
