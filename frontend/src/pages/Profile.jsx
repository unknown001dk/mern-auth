import {useSelector} from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import app from '../firebase'

function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  // console.log(imagePercent);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
  });
  // console.log(formData);
  const {currentUser} = useSelector(state => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
        // console.log('upload is ' + progress + '% done');
      });
      (error) => {
        setImageError(true);
      }
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({...formData, profilePicture: downloadURL});
          })
      }
    console.log(image);
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.profilePicture || currentUser.profilePicture}
          alt='profile-img'
          className='h-24 w-24 self-center curser-pointer rounded-full object-cover mt-2' />
        <p className='text-sm self-center'>
          {imageError ?
            (<span className='text-red-700'>Error uploading on image (File size must be less than 2 MB)</span>) : imagePercent > 0 && imagePercent < 100 ?
            (<span className='text-slate-700'>{`Uploading: ${imagePercent} % `}</span>) : imagePercent === 100 ?
            (<span className='text-green-700'>Image Upload succesfully</span>) : ''}
        </p>
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