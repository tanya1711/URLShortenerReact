import React, { useState, useEffect, useRef } from 'react';
import './PostLogin.css';

const App = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [isCustomUrlEnabled, setIsCustomUrlEnabled] = useState(false);
  const [shortenedUrlMessage, setShortenedUrlMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [planId, setPlanId] = useState('');
  const [userId, setUserId] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && !event.target.closest('.profile-icon')) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    if (loggedInUser) {
      setEmail(loggedInUser.email);
      const storedPassword = localStorage.getItem('password');
      setPassword(storedPassword);
      console.log(storedPassword);
    }

    const storedPlanId = localStorage.getItem('planId');
    const storedUserId = localStorage.getItem('userId');
    setPlanId(storedPlanId ? parseInt(storedPlanId) : 0);
    setUserId(parseInt(storedUserId) || '');
  }, []);

  const toggleUrlInput = () => {
    setIsCustomUrlEnabled(prevState => !prevState);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(prevState => !prevState);
  };

  const submitShortenUrlForm = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setShortenedUrlMessage('Email and/or password not found in localStorage.');
      return;
    }

    const credentials = btoa(`${email}:${password}`);
    const requestBody = {
      longUrl,
      userId,
      customUrl: isCustomUrlEnabled && customUrl.trim() ? customUrl : null
    };

    try {
      const response = await fetch('http://localhost:8081/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`
        },
        body: JSON.stringify(requestBody)
      });
      console.log(response);
      if (!response.ok) {
        if (response.status === 403) {
          setShortenedUrlMessage('OOPs, you reached your free trial limit!');
        } else {
          throw new Error('Failed to shorten URL');
        }
      }

      const data = await response.json();
      setShortenedUrlMessage(`Shortened URL: ${data.shortenedUrl}`);
    } catch (error) {
      console.error('Error:', error);
      setShortenedUrlMessage('Error shortening URL.');
    }
  };

  return (
    <div className="post-login-wrapper">
      <div className="profile-container">
        <div className="profile-icon" onClick={toggleDrawer}>
          A
        </div>
        <div ref={drawerRef} className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
          <a href="/profile">My Profile</a>
          <a href="/analytics">Analytics</a>
          <a href="/change-password">Change Password</a>
          <a href="/logout">Logout</a>
        </div>
      </div>

      <div className="PostLogin">
        <h2>Shorten a long URL</h2>
        <form id="shorten-url-form" onSubmit={submitShortenUrlForm}>
          <label htmlFor="longUrl">Enter your URL:</label>
          <input
            type="text"
            id="longUrl"
            name="longUrl"
            placeholder="https://example.com"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
          {planId === 1 && (
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="enableUrlInput"
                checked={isCustomUrlEnabled}
                onChange={toggleUrlInput}
              />
              <input
                type="text"
                id="customUrl"
                name="customUrl"
                placeholder="Enter your Custom URL"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                disabled={!isCustomUrlEnabled}
              />
            </div>
          )}
          <button type="submit">Shorten URL</button>
        </form>
        <div className={`success-message ${shortenedUrlMessage.includes('Error') ? 'error' : ''}`}>
          {shortenedUrlMessage}
        </div>
      </div>
    </div>
  );
};

export default App;
