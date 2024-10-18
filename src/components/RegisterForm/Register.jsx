import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6 py-12'>
      <div className='dark:bg-white bg-zinc-800 rounded-lg px-8 py-5 w-full max-w-lg '>
        <p className='font-semibold text-primary text-2xl text-center'>Sign Up</p>
        <div className='mt-6 space-y-6'>
          <div>
            <label htmlFor='username' className='text-white dark:text-gray-900 font-semibold'>Username</label>
            <input
              type='text'
              className='w-full mt-2 rounded-lg bg-zinc-900 dark:bg-zinc-200 text-white dark:text-black p-2 outline-none'
              placeholder='Enter your username'
              name='username'
              required
            />
          </div>

          <div className='mt-4'>
            <label htmlFor='email' className='text-white dark:text-gray-900 font-semibold'>E-mail</label>
            <input
              type='text'
              className='w-full mt-2 rounded-lg bg-zinc-900 dark:bg-zinc-200 text-white dark:text-black p-2 outline-none'
              placeholder='Enter your email'
              name='email'
              required
            />
          </div>

          <div className='mt-4'>
            <label htmlFor='password' className='text-white dark:text-gray-900 font-semibold'>Password</label>
            <input
              type='password'
              className='w-full mt-2 rounded-lg bg-zinc-900 dark:bg-zinc-200 text-white dark:text-black p-2 outline-none'
              placeholder='Password'
              name='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className='mt-4'>
            <label htmlFor='confirmPassword' className='text-white dark:text-gray-900 font-semibold'>Confirm Password</label>
            <input
              type='password'
              className='w-full mt-2 rounded-lg bg-zinc-900 dark:bg-zinc-200 text-white dark:text-black p-2 outline-none'
              placeholder='Confirm Password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          </div>

          <div>
            <button className='w-full bg-primary dark:bg-secondary text-white font-semibold py-3 rounded-lg'>
              SignUp
            </button>
          </div>

           <p className='flex mt-4 items-center justify-center text-zinc-500 dark:text-gray-900 font-semibold'>
            Or
          </p>

            <p className='flex mt-2 items-center justify-center text-zinc-200 dark:text-gray-700 font-semibold'>
            Already have an account?
            <Link to='/login' className='px-2 dark:text-secondary text-primary underline'>
              Login here
            </Link>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
