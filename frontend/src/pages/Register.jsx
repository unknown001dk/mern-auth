import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Register</h1>
    <form className='flex flex-col gap-4 '>
      <input
        className='bg-slate-100 p-3 rounded-lg'
        type="text"
        placeholder='Username'
        id='username' />
      <input
        className='bg-slate-100 p-3 rounded-lg'
        type="email"
        placeholder='Email'
        id='email' />
      <input
        className='bg-slate-100 p-3 rounded-lg'
        type="password"
        placeholder='Password'
        id='password' />
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Register
        </button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to='/login'>
        <span className='text-blue-500 '>Login</span>
      </Link>
    </div>
    </div>
  )
}

export default Register