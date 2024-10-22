import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // For redirecting after successful registration

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('User registered successfully!');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after success
        }, 2000); // Navigate to login after 2 seconds
      } else {
        setErrorMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      setErrorMessage('Error: Unable to connect to server');
    }
  };

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6 py-12'>
      <div className='dark:bg-white bg-zinc-800 rounded-lg px-8 py-5 w-full max-w-lg '>
        <p className='font-semibold text-primary text-2xl text-center'>Sign Up</p>
        <form onSubmit={handleSubmit}>
          <div className='mt-6 space-y-6'>
            <div>
              <label htmlFor='username' className='text-white dark:text-gray-900 font-semibold'>Username</label>
              <input
                type='text'
                className='w-full mt-2 rounded-lg bg-zinc-900 dark:bg-zinc-200 text-white dark:text-black p-2 outline-none'
                placeholder='Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className='mt-4'>
              <label htmlFor='email' className='text-white dark:text-gray-900 font-semibold'>E-mail</label>
              <input
                type='email'
                className='w-full mt-2 rounded-lg bg-zinc-900 dark:bg-zinc-200 text-white dark:text-black p-2 outline-none'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='mt-4'>
              <label htmlFor='password' className='text-white dark:text-gray-900 font-semibold'>Password</label>
              <input
                type='password'
                className='w-full mt-2 rounded-lg bg-zinc-900 dark:bg-zinc-200 text-white dark:text-black p-2 outline-none'
                placeholder='Password'
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
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            </div>

            <div>
              <button type='submit' className='w-full bg-primary dark:bg-secondary text-white font-semibold py-3 rounded-lg'>
                SignUp
              </button>
            </div>

            {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

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
        </form>
      </div>
    </div>
  );
};

export default Register;
