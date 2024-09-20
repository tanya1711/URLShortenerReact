import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Analytics.css';
import CopyIconArrow from './Arrow.svg';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [totalClickCount, setTotalClickCount] = useState(0);
  const [browserClicks, setBrowserClicks] = useState(0);
  const [androidClicks, setAndroidClicks] = useState(0);
  const [iosClicks, setIosClicks] = useState(0);
  const userId = localStorage.getItem('userId');;
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

        const totalClicks = data.urls.reduce((acc, url) => acc + url.clickCount, 0);
        setTotalClickCount(totalClicks);

        const totalBrowserClicks = data.urls.reduce((acc, url) => acc + url.browserClicks, 0);
        const totalAndroidClicks = data.urls.reduce((acc, url) => acc + url.androidClicks, 0);
        const totalIosClicks = data.urls.reduce((acc, url) => acc + url.iosClicks, 0);

        setBrowserClicks(totalBrowserClicks);
        setAndroidClicks(totalAndroidClicks);
        setIosClicks(totalIosClicks);
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
        <strong>Loading...</strong>
      </div>
    );
  }

  const deviceShareData = {
    labels: ['Browser', 'Android', 'iOS'],
    datasets: [{
      data: [browserClicks, androidClicks, iosClicks],
      backgroundColor: ['#FFA726', '#42A5F5', '#66BB6A'],
      hoverBackgroundColor: ['#FFB74D', '#64B5F6', '#81C784']
    }]
  };

  const deviceShareOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          }
        }
      }
    }
  };

  return (
    <div className="Analytics-wrapper">
      <button className="Analytics-copy-icon-arrow" onClick={handleGoBack}>
        <img src={CopyIconArrow} alt="Arrow" />
      </button>
      <div className="Analytics-css-wrapper">
        <div className="Analytics-card-wrapper">
          <div className="Analytics-header-wrapper">
            <h2 className="Analytics-card-top-header">Total Click Count</h2>
            <h2 className="click-count-number">{totalClickCount}</h2>
          </div>
          <hr className="custom-hr" />
          <div className="Analytics-card-bottom">
            <h2 className="Analytics-card-bottom-header">Device Share</h2>
            <div className="Analytics-chart-container">
              <Pie data={deviceShareData} options={deviceShareOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
