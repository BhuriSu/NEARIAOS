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
  deleteUserFailure,
} from '../redux/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import UserAvatar from '../Chat/UserAvatar';
// css 
import { BackgroundProfileContainer, BackToListPage, LogOutLine,
    StyledInput, DivImage, SaveBtnStyle } from "./profileElements";

import { CircularProgressbar } from 'react-circular-progressbar';
import { Alert, Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function ProfileEditPage() {
  const { currentUser, error, loading } = useSelector((state) => state.user) || {};
  const [formData, setFormData] = useState({
    username: currentUser ? currentUser.username : "",
    date: currentUser ? currentUser.date : "",
    about: currentUser ? currentUser.about : "",
    beverage: currentUser ? currentUser.beverage : "",
    favorite: currentUser ? currentUser.favorite : "",
    workplace: currentUser ? currentUser.workplace : "",
    profilePicture: currentUser ? currentUser.profilePicture : "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      setFormData({ ...formData, profilePicture: URL.createObjectURL(file) });
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);


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
      () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    console.log(formData);
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
      const res = await fetch(`/api/users/update/${formData._id}`, {
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
      const res = await fetch(`/api/users/delete/${formData._id}`, {
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
    
        <form onSubmit={handleUpdateSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DivImage>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-100 h-100 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
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
          <UserAvatar
             profilePicture={imageFileUrl || (formData && formData.profilePicture) || ''}  
             height={100} 
             width={100} 
             alt='user'
             className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-50'
            }`}
          />
        </div>
  
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
         </DivImage>
         </div>
          <span style={{ textShadow: "none", color: "#000" }} >
          <StyledInput  
          type='text'
          id='username'
          placeholder='username...'
          defaultValue={formData.username}
          onChange={handleChange} 
          />
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#000" }} >
          <div style={{
          backgroundColor: '#00ffa6',
          borderRadius: '20px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
          }}>
         <input 
         type="date" 
         defaultValue={formData.date}
         id="date" 
         onChange={handleChange}
         style={{
          border: 'none',
          background: 'transparent',
          color: '#000',
          outline: 'none',
          textAlign: 'center',
          }}
         />
         </div>
          </span>

          <br/>
          <span style={{ textShadow: "none", color: "#000" }} >
            <StyledInput 
            type="text" 
            id="beverage" 
            placeholder="beverage..." 
            defaultValue={formData.beverage}
            onChange={handleChange} 
            />
          </span>

          <br/>
          <span style={{ textShadow: "none", color: "#000" }} >
            <StyledInput 
            type="text" 
            id="workplace" 
            placeholder="workplace..." 
            defaultValue={formData.workplace}
            onChange={handleChange} 
            />
          </span>

          <br/>
          <span style={{ textShadow: "none", color: "#000" }} >
            <StyledInput 
            type="text" 
            id="favorite" 
            placeholder="favorite..."
            defaultValue={formData.favorite}
            onChange={handleChange}
            />
          </span>

          <br/>
          <span style={{ textShadow: "none", color: "#000" }} >
            <StyledInput 
            type="text" 
            id="about" 
            placeholder="about..." 
            defaultValue={formData.about}
            onChange={handleChange}
            />
          </span>

          <br/>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SaveBtnStyle
               type='submit'
               outline
               disabled={loading || imageFileUploading}
            >
            {loading ? 'Loading...' : 'Update'}
            </SaveBtnStyle>
            </div>

          <br/>
        </form>
      
        <br/>

          <Link to="/listUsers">
          <BackToListPage>
          Back to ListPage
          </BackToListPage>
          </Link>

          <Link to="/startForm" onClick={LogOut}>
          <LogOutLine>
           Log out
          </LogOutLine>
          </Link>


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
                Yes, Iam sure
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

export default ProfileEditPage;