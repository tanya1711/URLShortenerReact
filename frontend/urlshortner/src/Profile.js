import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="Profile-wrapper">
      <header className="header">
        <img src="" alt="url.short.logo" className="logo" />
        <nav className="Profile-nav-links">
          <div className="Profile-nav-link_w-dp active">
            <div>Why BigShyft?</div>
            <img src="https://cdn.prod.website-files.com/64786e19aeed3509f992bf51/64900130edbf47e21258a185_mesh%20nav%20active.svg" loading="lazy" alt="" className="Profile-nav-active-bar" />
          </div>
          <div className="Profile-nav-link_w-dp">
            <div>Product</div>
            <img src="https://cdn.prod.website-files.com/64786e19aeed3509f992bf51/64900130edbf47e21258a185_mesh%20nav%20active.svg" loading="lazy" alt="" className="Profile-nav-active-bar" />
          </div>
          <a href="#pricing" className="Profile-nav-link_w-dp">
            <div>Pricing</div>
            <img src="https://cdn.prod.website-files.com/64786e19aeed3509f992bf51/64900130edbf47e21258a185_mesh%20nav%20active.svg" loading="lazy" alt="" className="Profile-nav-active-bar" />
          </a>
          <div className="Profile-nav-link_w-dp">
            <div>Admin</div>
            <img src="https://cdn.prod.website-files.com/64786e19aeed3509f992bf51/64900130edbf47e21258a185_mesh%20nav%20active.svg" loading="lazy" alt="" className="Profile-nav-active-bar" />
          </div>
        </nav>
        <div className="Profile-header-buttons">
          <a href="#login" className="Profile-btn-login">Login</a>
          <a href="#signup" className="Profile-btn-demo">Sign Up</a>
        </div>
      </header>

      {/* Heading added below the header */}
      <div className="Profile-heading-container">
        <h1 data-w-id="84e411b3-e601-83b5-51be-a803db3560cd" className="heading-style-h1 is-hero">
          Info Edge’s First <span className="text-color-blue">URL Shortning</span> Platform!
        </h1>
      </div>

      {/* Your other Profile page content goes here */}
    </div>
  );
};

export default Profile;
