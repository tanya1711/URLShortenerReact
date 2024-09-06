import React, { useState, useEffect } from 'react';
import './PostLogin.css';

const App = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [isCustomUrlEnabled, setIsCustomUrlEnabled] = useState(false);
  const [shortenedUrlMessage, setShortenedUrlMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [planId, setPlanId] = useState(null);

 useEffect(() => {
     const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
     if (loggedInUser) {
       setEmail(loggedInUser.email);
       setPassword(loggedInUser.password);
     }

     // Fetch planId from localStorage
     const storedPlanId = localStorage.getItem('planId');
     setPlanId(storedPlanId ? parseInt(storedPlanId) : 0); // Default to 0 if not found
   }, []);

  const toggleUrlInput = () => {
    setIsCustomUrlEnabled(prevState => !prevState);
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
        <div className="PostLogin">
          <h1>BIGSHYFT</h1>
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
            {planId === 0 && (
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
