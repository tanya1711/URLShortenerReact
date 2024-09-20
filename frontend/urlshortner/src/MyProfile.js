import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyProfile.css';
import CopyIcon from './Copylink.svg';
import CopyIconArrow from './Arrow.svg';

const MyProfile = () => {
const [userDetails, setUserDetails] = useState(null);
const userId = localStorage.getItem('userId');
const navigate = useNavigate();

const handleGoBack = () => {
    navigate(-1);
  };

useEffect(() => {

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8081/details/${userId}`);
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

if (!userDetails) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '24px',
      color: '#333',

    }}>
      <strong>Profile is Loading...</strong>
    </div>
  );
}
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
  });
}
  return (
  <div className="myProfile-post-login-wrapper">
    <button className="copy-icon-arrow" onClick={handleGoBack}>
      <img src={CopyIconArrow} alt="Arrow"/>
    </button>
      <div class="css-wrapper">
          <div className="card-wrapper">
              <div className="css-container">
                  <span className="chakra-avatar css-41ch28">
                  <img
                      src="https://media.mesh.ai/mesh/media/profilePhoto/defaultImages/defaultPhoto-21.png"
                      alt="Ayush Srivastava"
                      className="chakra-avatar__img css-3a5bz2"
                      />
                  </span>
                  <div class="name-header">
                      <div className="name-subheader">
                          <div className="myprofile-name">
                              <h2 className="chakra-text css-6mrx8e">{userDetails.name}</h2>
                          </div>
                          <div className="css-hboir5">
                              <div className="css-70qvj9">
                                  <div className="css-zrdwan">
                                      <svg
                                          viewBox="0 0 24 24"
                                          focusable="false"
                                          className="chakra-icon css-1bo32ph"
                                          >
                                          <path
                                              d="M20 7.5C20 6.675 19.28 6 18.4 6H5.6C4.72 6 4 6.675 4 7.5V16.5C4 17.325 4.72 18 5.6 18H18.4C19.28 18 20 17.325 20 16.5V7.5ZM18.4 7.5L12 11.25L5.6 7.5H18.4ZM18.4 16.5H5.6V9L12 12.75L18.4 9V16.5Z"
                                              fill="currentColor"
                                              />
                                      </svg>
                                      <p className="chakra-text css-9z8run">
                                          {" "}
                                          {userDetails.email}
                                      </p>
                                  </div>
                                  <h2 className="chakra-text css-1kfrb8b">•</h2>
                              </div>
                              <div className="css-70qvj9">
                                  <div className="css-zrdwan">
                                      <svg
                                          viewBox="0 0 24 24"
                                          focusable="false"
                                          className="chakra-icon css-1bo32ph"
                                          >
                                          <path
                                              d="M16.8 12.6C16.8 12.2686 16.5314 12 16.2 12H14.2C13.8686 12 13.6 12.2686 13.6 12.6C13.6 12.9314 13.8686 13.2 14.2 13.2H16.2C16.5314 13.2 16.8 12.9314 16.8 12.6Z"
                                              fill="currentColor"
                                              />
                                          <path
                                              d="M16.8 15C16.8 14.6686 16.5314 14.4 16.2 14.4H14.2C13.8686 14.4 13.6 14.6686 13.6 15C13.6 15.3314 13.8686 15.6 14.2 15.6H16.2C16.5314 15.6 16.8 15.3314 16.8 15Z"
                                              fill="currentColor"
                                              />
                                          <path
                                              d="M18.4 8H14.4V5.6C14.4 4.72 13.68 4 12.8 4H11.2C10.32 4 9.6 4.72 9.6 5.6V8H5.6C4.72 8 4 8.72 4 9.6V18.4C4 19.28 4.72 20 5.6 20H18.4C19.28 20 20 19.28 20 18.4V9.6C20 8.72 19.28 8 18.4 8ZM11.2 5.6H12.8V9.6H11.2V5.6ZM18.4 17.4C18.4 17.9523 17.9523 18.4 17.4 18.4H6.6C6.04772 18.4 5.6 17.9523 5.6 17.4V10.6C5.6 10.0477 6.04772 9.6 6.6 9.6H9.6C9.6 10.48 10.32 11.2 11.2 11.2H12.8C13.68 11.2 14.4 10.48 14.4 9.6H17.4C17.9523 9.6 18.4 10.0477 18.4 10.6V17.4Z"
                                              fill="currentColor"
                                              />
                                          <path
                                              d="M9.6 14.4C10.2627 14.4 10.8 13.8627 10.8 13.2C10.8 12.5373 10.2627 12 9.6 12C8.93726 12 8.4 12.5373 8.4 13.2C8.4 13.8627 8.93726 14.4 9.6 14.4Z"
                                              fill="currentColor"
                                              />
                                          <path
                                              d="M11.264 15.344C10.752 15.12 10.192 15 9.6 15C9.008 15 8.448 15.12 7.936 15.344C7.488 15.536 7.2 15.968 7.2 16.456V16.8H12V16.456C12 15.968 11.712 15.536 11.264 15.344Z"
                                              fill="currentColor"
                                              />
                                      </svg>
                                      <p className="chakra-text css-9z8run">Current Plan: <strong>{userDetails.planName}</strong></p>
                                  </div>
                              </div>
                          </div>
                          <div className="css-hboir5">
                              <div className="css-70qvj9">
                                  <div className="css-r54sf5">
                                      <svg
                                          viewBox="0 0 24 24"
                                          focusable="false"
                                          className="chakra-icon css-1bo32ph"
                                          >
                                          <g clipPath="url(#clip0_3437_70787)">
                                              <path
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M20 10H4V8C4 7.44772 4.44772 7 5 7H9V6C9 4.89543 9.89543 4 11 4H13C14.1046 4 15 4.89543 15 6V7H19C19.5523 7 20 7.44772 20 8V10ZM20 11H4V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V11ZM18 13V18H6V13H18ZM12 8C11.4477 8 11 7.55229 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7C13 7.55228 12.5523 8 12 8Z"
                                                  fill="currentColor"
                                                  />
                                          </g>
                                          <defs>
                                              <clipPath id="clip0_3437_70787">
                                                  <rect width={24} height={24} rx={8} fill="transparent" />
                                              </clipPath>
                                          </defs>
                                      </svg>
                                      <p className="chakra-text css-9z8run"> Total Credits: <strong>{userDetails.allowedCounts}</strong></p>
                                  </div>
                                  <h2 className="chakra-text css-1kfrb8b">•</h2>
                              </div>
                              <div className="css-70qvj9">
                                  <div className="css-r54sf5">
                                      <svg
                                          viewBox="0 0 24 24"
                                          focusable="false"
                                          className="chakra-icon css-1bo32ph"
                                          >
                                          <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M10.8302 4.51102C11.5509 4.08161 12.4491 4.08161 13.1698 4.51102L14.7698 5.46421C15.4618 5.87644 15.8857 6.62243 15.8857 7.42787V9.25118C15.8857 10.0566 15.4618 10.8026 14.7698 11.2148L13.1698 12.168C12.4491 12.5974 11.5509 12.5974 10.8302 12.168L9.23016 11.2148C8.5382 10.8026 8.11429 10.0566 8.11429 9.25117V7.42787C8.11429 6.62243 8.5382 5.87644 9.23016 5.46421L10.8302 4.51102ZM13.6 7.42787L12 6.47468L10.4 7.42787L10.4 9.25117L12 10.2044L13.6 9.25118V7.42787ZM6.68044 11.8142C7.40482 11.3783 8.31067 11.3778 9.0355 11.813L10.6623 12.7896C11.3504 13.2028 11.7714 13.9466 11.7714 14.7493V16.5486C11.7714 17.3512 11.3504 18.0951 10.6623 18.5082L9.0355 19.4849C8.31067 19.9201 7.40482 19.9196 6.68044 19.4837L5.10719 18.537C4.42016 18.1236 4 17.3804 4 16.5785L4 14.7194C4 13.9175 4.42016 13.1743 5.10719 12.7609L6.68044 11.8142ZM14.9444 11.8496C15.6652 11.4202 16.5633 11.4202 17.2841 11.8496L18.8841 12.8028C19.5761 13.215 20 13.961 20 14.7665V16.5606C20 17.366 19.5761 18.112 18.8841 18.5243L17.2841 19.4774C16.5633 19.9069 15.6652 19.9068 14.9444 19.4774L13.3444 18.5243C12.6525 18.112 12.2286 17.366 12.2286 16.5606V14.7665C12.2286 13.961 12.6525 13.215 13.3444 12.8028L14.9444 11.8496ZM9.48571 14.7493L7.85896 13.7726L6.28571 14.7194V16.5785L7.85896 17.5253L9.48571 16.5486L9.48571 14.7493ZM16.1143 13.8133L14.5143 14.7665V16.5606L16.1143 17.5138L17.7143 16.5606L17.7143 14.7665L16.1143 13.8133Z"
                                              fill="currentColor"
                                              />
                                      </svg>
                                      <p className="chakra-text css-9z8run">
                                          {" "}
                                          Available Credits: <strong>{(userDetails.allowedCounts-userDetails.count)}</strong>
                                      </p>
                                  </div>
                                  <h2 className="chakra-text css-1kfrb8b">•</h2>
                              </div>
                              <div className="css-70qvj9">
                                  <div className="css-r54sf5">
                                      <svg
                                          viewBox="0 0 24 24"
                                          focusable="false"
                                          className="chakra-icon css-1bo32ph"
                                          >
                                          <g id="Location">
                                              <g id="Vector">
                                                  <path
                                                      fillRule="evenodd"
                                                      clipRule="evenodd"
                                                      d="M9.29591 15.08C10.0708 16.0491 10.9601 16.8463 11.6703 17.4072C11.7864 17.4989 11.8968 17.5836 12 17.6609C12.1032 17.5836 12.2135 17.4989 12.3297 17.4072C13.0399 16.8463 13.9292 16.0491 14.7041 15.08C15.7726 13.7442 16.5 12.2361 16.5 10.6668C16.5 8.04362 14.4356 6 11.9999 6C9.56434 6 7.5 8.04357 7.5 10.6668C7.5 12.2359 8.22734 13.744 9.29591 15.08ZM11.7795 19.9384C11.7795 19.9384 9.5313 18.5771 7.73383 16.329C6.50885 14.7974 5.5 12.8587 5.5 10.6668C5.5 6.9871 8.41228 4 11.9999 4C15.5876 4 18.5 6.9871 18.5 10.6668C18.5 12.8588 17.4912 14.7975 16.2662 16.329C14.4686 18.5771 12.2205 19.9384 12.2205 19.9384C12.0844 20.0205 11.9156 20.0205 11.7795 19.9384Z"
                                                      fill="currentColor"
                                                      />
                                                  <path
                                                      fillRule="evenodd"
                                                      clipRule="evenodd"
                                                      d="M12 12C12.8284 12 13.5 11.3284 13.5 10.5C13.5 9.67157 12.8284 9 12 9C11.1716 9 10.5 9.67157 10.5 10.5C10.5 11.3284 11.1716 12 12 12Z"
                                                      fill="currentColor"
                                                      />
                                              </g>
                                          </g>
                                      </svg>
                                      <p className="chakra-text css-9z8run"> India - North</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <hr class="custom-hr"/>
              <div className="card-bottom">
                  <h2 className="card-bottom-header">My URLs</h2>
                  <ul className="url-list">
                      {userDetails.urls.map((urlData, index) => (
                      <li key={index} className="url-card">
                          <div className="url-card-content">
                                  <p className="long-url">
                                      <strong>Long URL:</strong> {urlData.longUrl}
                                      <button
                                          className="copy-icon"
                                          onClick={() => copyToClipboard(urlData.longUrl)}
                                      title="Copy URL"
                                      >
                                      <img src={CopyIcon} alt="Copy URL" className="copy-icon-img" />
                                      </button>
                                  </p>
                                  <p className="short-url">
                                      <strong>Short URL:</strong> {urlData.shortUrl}
                                  </p>
                                  <div className="click-count">
                                    <p className="browser-clicks">
                                      <strong>Browser Clicks:</strong> {urlData.browserClicks}
                                    </p>
                                    <p className="android-clicks">
                                      <strong>Android Clicks:</strong> {urlData.androidClicks}
                                    </p>
                                    <p className="ios-clicks">
                                      <strong>iOS Clicks:</strong> {urlData.iosClicks}
                                    </p>
                                  </div>
                                  <p className="total-clicks">
                                      <strong>Total Clicks:</strong> {urlData.clickCount}
                                  </p>

                          </div>
                      </li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>
  </div>
  );
};

export default MyProfile;
