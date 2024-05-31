import {useSelector} from 'react-redux'

function Profile() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img
          src={currentUser.profilePicture}
          alt='profile-img'
          className='h-24 w-24 self-center curser-pointer rounded-full object-cover mt-2' />
        <input
          defaultValue={currentUser.username}
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
          type="text" />
        <input
          defaultValue={currentUser.email}
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          type="email" />
        <input
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          type="password" />
        <button
          className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account?</span>
        <span className='text-red-700 cursor-pointer'>Logout</span>
      </div>
    </div>
  )
}

export default Profile