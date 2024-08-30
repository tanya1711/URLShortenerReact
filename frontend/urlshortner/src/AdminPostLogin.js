import React, { useState } from 'react';
import Select from 'react-select';
import './AdminPostLogin.css';

const AdminPostLogin = ({ companyOptions }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  const recruiterOptions = [
    { value: 'recruiter1', label: 'Recruiter 1' },
    { value: 'recruiter2', label: 'Recruiter 2' },
    { value: 'recruiter3', label: 'Recruiter 3' },
  ];

  const handleCompanyChange = (selectedOption) => {
    setSelectedCompany(selectedOption);
  };

  const handleRecruiterChange = (selectedOption) => {
    setSelectedRecruiter(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Company:', selectedCompany);
    console.log('Selected Recruiter:', selectedRecruiter);
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
      </div>
    </div>
  );
};

export default AdminPostLogin;