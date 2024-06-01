import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import app from '../firebase';
import { useDispatch } from 'react-redux'
import { LoginSuccess } from '../redux/user/userSlice';

function OAuth() {
  const dispatch = useDispatch();
  const handleGoogleClick = async() => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        }),
      });
      const data = await res.json();
      // console.log(data);
      dispatch(LoginSuccess(data));
      // console.log(result);
    } catch (error) {
      console.log("Could not connect to Google", error);
    }
  }
  return (
    <button
      type='button'
      onClick={ handleGoogleClick }
      className='bg-red-700 rounded-lg p-3 text-white uppercase hover:opacity-95'>
      Continue with Google
    </button>
  )
}

export default OAuth