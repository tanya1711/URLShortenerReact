import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import './AdminPostLogin.css';

const AdminPostLogin = () => {
  const [companyOptions, setCompanyOptions] = useState([]);
  const [recruiterOptions, setRecruiterOptions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [message, setMessage] = useState('');
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

    const toggleDrawer = () => {
      setIsDrawerOpen(prevState => !prevState);
    };



  // Fetch users (companies) from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8081/users');
        if (response.ok) {
          const users = await response.json();
          if (users.length > 0) {
            const userOptions = users.map((user) => ({
              value: user.userId,
              label: user.name || 'Unknown', // Default to 'Unknown' if name is missing
            }));
            setCompanyOptions(userOptions);
          } else {
            setCompanyOptions([]); // Handle empty data
          }
        } else {
          console.error('Failed to fetch users:', response.status);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch plans from the API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:8081/plans');
        if (response.ok) {
          const plans = await response.json();
          if (plans.length > 0) {
            const planOptions = plans.map((plan) => ({
              value: plan.planId,
              label: plan.planName || 'No name available', // Default to 'No name available' if name is missing
            }));
            setRecruiterOptions(planOptions);
          } else {
            setRecruiterOptions([]); // Handle empty data
          }
        } else {
          console.error('Failed to fetch plans:', response.status);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handleCompanyChange = (selectedOption) => {
    setSelectedCompany(selectedOption);
    console.log('Company Selected:', selectedOption);
  };

  const handleRecruiterChange = (selectedOption) => {
    setSelectedRecruiter(selectedOption);
    console.log('Recruiter Selected:', selectedOption);
  };
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    console.log('Selected Company:', selectedCompany);
    console.log('Selected Recruiter:', selectedRecruiter);
    localStorage.setItem('planId', selectedRecruiter.value);

    if (selectedCompany && selectedRecruiter) {
      try {
        const response = await fetch(`http://localhost:8081/updatePlan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: selectedCompany.value,
            planId: selectedRecruiter.value,
          }),
        });

        if (response.ok) {
          setMessage('Plan updated successfully!');
          localStorage.setItem('planId', selectedRecruiter.value);
        } else {
          setMessage(`Failed to update the plan. Status code: ${response.status}`);
        }
      } catch (error) {
        setMessage(`Error updating the plan: ${error.message}`);
      }
    } else {
      setMessage('Please select both a user and a plan.');
    }
  };

  return (
    <div className="post-login-wrapper">
      <div className="profile-container">
        <div className="profile-icon" onClick={toggleDrawer}>
          A
        </div>
        <div ref={drawerRef} className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
          <a href="/my-profile">My Profile</a>
          <a href="/analytics">Analytics</a>
          <a href="/my-profile">Change Password</a>
          <a href="/" onClick={handleLogout}>Logout</a>
        </div>
      </div>

      <div className="adminpostlogin-wrapper">
        <div className="adminpostlogin-content">
          <h3>Plan Updation</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <Select
                className="adminpostlogin-react-select-wrap"
                options={companyOptions}
                placeholder="Search User..."
                value={selectedCompany}
                onChange={handleCompanyChange}
                classNamePrefix="adminpostlogin"
              />
              <div className="noerror" id="comperr"></div>
            </div>
            <br />
            <div>
              <Select
                className="adminpostlogin-react-select-wrap"
                options={recruiterOptions}
                placeholder="Search Plan..."
                value={selectedRecruiter}
                onChange={handleRecruiterChange}
                classNamePrefix="adminpostlogin"
              />
              <div className="noerror" id="recerr"></div>
            </div>
            <input type="submit" className="adminpostlogin-select-btn" value="Update" />
          </form>

          {message && (
            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPostLogin;
