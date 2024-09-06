import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './AdminPostLogin.css';

const AdminPostLogin = () => {
  const [companyOptions, setCompanyOptions] = useState([]);
  const [recruiterOptions, setRecruiterOptions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [message, setMessage] = useState('');


  // Fetch users (companies) from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8081/users');
        if (response.ok) {
          const users = await response.json();
          if (users.length > 0) {
            // Map user data to the format expected by react-select
            const userOptions = users.map(user => ({
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
            // Map plan data to the format expected by react-select
            const planOptions = plans.map(plan => ({
              value: plan.planId,
              label: plan.planName || 'No name available' // Default to 'No name available' if name is missing
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
   console.log('Company Selected:', selectedOption); // Debug log
 };

 const handleRecruiterChange = (selectedOption) => {
   setSelectedRecruiter(selectedOption);
   console.log('Recruiter Selected:', selectedOption); // Debug log
 };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
console.log('Selected Company:', selectedCompany); // Debug log
  console.log('Selected Recruiter:', selectedRecruiter); // Debug log
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
               setMessage('Plan updated successfully!');  // Show success message
               localStorage.setItem('planId', selectedRecruiter.value); // Save to localStorage after success
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
  );

};

export default AdminPostLogin;
