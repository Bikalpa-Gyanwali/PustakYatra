import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { username } = location.state || { username: 'User' };

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6 py-12'>
      <div className='bg-zinc-800 dark:bg-white rounded-lg px-8 py-10 w-full max-w-md text-center'>
        <h1 className='text-2xl font-semibold text-primary dark:text-secondary'>Welcome, {username}!</h1>
      </div>
    </div>
  );
};

export default Dashboard;
