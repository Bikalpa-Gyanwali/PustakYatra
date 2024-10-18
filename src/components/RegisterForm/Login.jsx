import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6 py-12'>
      <div className='bg-zinc-800 dark:bg-white rounded-lg px-8 py-10 w-full max-w-md'>
        <p className='font-semibold text-primary text-xl text-center'>Login</p>
        <div className='mt-6 space-y-6'>

          <div>
            <label htmlFor='username' className='text-white dark:text-gray-900 font-semibold'>Username</label>
            <input
              type='text'
              className='w-full mt-2 rounded-lg bg-zinc-900 dark:bg-zinc-200 text-white dark:text-black p-3 outline-none'
              placeholder='Enter your username'
              name='username'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='text-white dark:text-gray-900 font-semibold'>Password</label>
            <input
              type='password'
              className='w-full mt-2 rounded-lg bg-zinc-900 dark:bg-zinc-200 text-white dark:text-black p-3 outline-none'
              placeholder='Enter your password'
              name='password'
              required
            />
          </div>

          <div>
            <button className='w-full bg-primary dark:bg-secondary text-white font-semibold py-3 rounded-lg'>
              Login
            </button>
          </div>

          <p className='flex mt-4 items-center justify-center text-zinc-500 dark:text-gray-900 font-semibold'>
            Or
          </p>

          <p className='flex mt-2 items-center justify-center text-zinc-200 dark:text-gray-700 font-semibold'>
            Don't have an account?
            <Link to='/register' className='px-2 dark:text-secondary text-primary underline'>
              Register here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
