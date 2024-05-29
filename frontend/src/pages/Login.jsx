import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginStart, LoginSuccess, LoginFailure } from '../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux'

function Login() {
  const[formData, setFormData] = useState({});
  const { loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handles the input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  // handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(LoginStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        dispatch(LoginFailure(data));
        return;
      }
      dispatch(LoginSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(LoginFailure(error));
    }
  }
  // console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <input
        onChange={handleChange}
        className='bg-slate-100 p-3 rounded-lg'
        type="email"
        placeholder='Email'
        id='email' />
      <input
        onChange={handleChange}
        className='bg-slate-100 p-3 rounded-lg'
        type="password"
        placeholder='Password'
        id='password' />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading? 'Loading...' : 'Login'}
        </button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Do not have an account?</p>
      <Link to='/register'>
        <span className='text-blue-500 '>Register</span>
      </Link>
    </div>
    <p className='text-red-700 mt-5'>
      {error ? error.message || 'something went wrong!' : ""}
    </p>
    </div>
  )
}

export default Login