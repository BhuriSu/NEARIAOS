import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

//firebase
import { getAuth, signOut } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { firebase } from '../Firebase';

//redux
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} from '../redux/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// css 
import { BackgroundProfileContainer, BackToListPage, DateContainer, LogOutLine,
   FormEditProfile, StyledInput, SaveBtnStyle, InputAvatar } from "./profileElements";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Alert, Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function ProfileEdit() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

    const handleImageChange = (e) => {
      const file = e.target.files[0];
       if (file) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
       }
      };
     useEffect(() => {
       if (imageFile) {
        uploadImage();
       }
     }, [imageFile]);

    // Handle input change
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    
    const uploadImage = async () => {
      // service firebase.storage {
      //   match /b/{bucket}/o {
      //     match /{allPaths=**} {
      //       allow read;
      //       allow write: if
      //       request.resource.size < 2 * 1024 * 1024 &&
      //       request.resource.contentType.matches('image/.*')
      //     }
      //   }
      // }
      setImageFileUploading(true);
      setImageFileUploadError(null);
      const storage = getStorage(firebase);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
    
          setImageFileUploadError(
            'Could not upload image (File must be less than 2MB)'
          );
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
          setImageFileUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setFormData({ ...formData, profilePicture: downloadURL });
            setImageFileUploading(false);
          });
        }
      );
    };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      if (Object.keys(formData).length === 0) {
        setUpdateUserError('No changes made');
        return;
      }
      if (imageFileUploading) {
        setUpdateUserError('Please wait for image to upload');
        return;
      }
      try {
        dispatch(updateStart());
        const res = await fetch(`/users/update/${currentUser._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
        } else {
          dispatch(updateSuccess(data));
          setUpdateUserSuccess("User's profile updated successfully");
        }
      } catch (error) {
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message);
      }
    };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/users/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
   
  const LogOut = async () => {
    try {
      const auth = getAuth();
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <BackgroundProfileContainer >
     
        <FormEditProfile onSubmit={handleFormSubmit}>
       
         <InputAvatar
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
         />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}

          <span style={{ textShadow: "none", color: "#fff" }} >
            Username: 
          <label>      
          <StyledInput  
          type='text'
          id='username'
          placeholder='username...'
          onChange={handleChange} 
          />
          </label>
          </span>

          <br/>

          <span style={{ textShadow: "none", color: "#fff" }} >
            Date of birth: 
           <DateContainer>
           <LocalizationProvider 
           dateAdapter={AdapterDayjs} 
           type="date" 
           id="date" 
           onChange={handleChange}
           >
           <DatePicker 
           // dateAdapter={AdapterDayjs} 
           // type="date" 
           // id="date" 
           // defaultValue={currentUser.date} 
           // onChange={handleChange}
           />
           </LocalizationProvider>
           </DateContainer>
          </span>

          <br/>

          <span style={{ textShadow: "none", color: "#fff" }} >
            Beverage:
            <label>
            <StyledInput 
            type="text" 
            id="beverage" 
            placeholder="beverage..." 
            onChange={handleChange} 
            />
          </label>
          </span>

          <br/>

          <span style={{ textShadow: "none", color: "#fff" }} >
            Workplace: 
            <label>
            <StyledInput 
            type="text" 
            id="workplace" 
            placeholder="workplace..." 
            onChange={handleChange} 
            />
          </label>
          </span>

          <br/>

          <span style={{ textShadow: "none", color: "#fff" }} >
            Favorite:
           <label>
            <StyledInput 
            type="text" 
            id="favorite" 
            placeholder="favorite..."
            onChange={handleChange}
            />
          </label>
          </span>

          <br/>

          <span style={{ textShadow: "none", color: "#fff" }} >
            About:
            <label>
            <StyledInput 
            type="text" 
            id="about" 
            placeholder="about..." 
            onChange={handleChange}
            />
          </label>
          </span>

          <br/>

          <SaveBtnStyle 
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={loading || imageFileUploading}
          >
          {loading ? 'Loading...' : 'Update'}
          </SaveBtnStyle>

          <br/>
        </FormEditProfile>
      
        <br/>

          <Link to="/listUsers">
          <BackToListPage>
          Back to ListPage
          </BackToListPage>
          </Link>

        <br/>

          <Link to="/startForm" onClick={LogOut}>
          <LogOutLine>
           Log out
          </LogOutLine>
          </Link>

        <br/>

        <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
       </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

       
      </BackgroundProfileContainer>   
    </>
  );
}

export default ProfileEdit;