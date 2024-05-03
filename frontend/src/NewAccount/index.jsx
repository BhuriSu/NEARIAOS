import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { firebase } from '../Firebase';

//redux
import {
  createStart,
  createSuccess,
  createFailure,
} from '../redux/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import UserAvatar from '../Chat/UserAvatar';
// css 
import { BackgroundProfileContainer,
    StyledInput, DivImage, SaveBtnStyle} from "./NewAccountElements";

import { CircularProgressbar } from 'react-circular-progressbar';
import { Alert } from 'flowbite-react';

function NewAccountPage() {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user) || {};
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [createUserSuccess, setCreateUserSuccess] = useState(null);
  const [createUserError, setCreateUserError] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

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
        // Handle input change
    const handleChange = (e) => {
          setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleCreateSubmit = async (e) => {
      e.preventDefault();
      setCreateUserError(null);
      setCreateUserSuccess(null);
      console.log(formData);
      if (Object.keys(formData).length === 0) {
        setCreateUserError('No changes made');
        return;
      }
      if (imageFileUploading) {
        setCreateUserError('Please wait for image to upload');
        return;
      }
      try {
        dispatch(createStart(formData));
        const res = await fetch('/api/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(createFailure(data.message));
          setCreateUserError(data.message);
        } else {
          dispatch(createSuccess(data));
          console.log(createSuccess(data))
          setCreateUserSuccess("User's profile updated successfully");
          navigate('/profile', { state: { formData } });
        }
      } catch (error) {
        dispatch(createFailure(error.message));
        setCreateUserError(error.message);
      }
    };
  
  return (
    <>
      <BackgroundProfileContainer >
        <form onSubmit={handleCreateSubmit}>
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
            profilePicture={imageFileUrl}  
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
          onChange={handleChange} 
          />
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#000" }} >
          <div style={{
          backgroundColor: '#9645ff',
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
            onChange={handleChange} 
            />
          </span>

          <br/>
          <span style={{ textShadow: "none", color: "#000" }} >
            <StyledInput 
            type="text" 
            id="workplace" 
            placeholder="workplace..." 
            onChange={handleChange} 
            />
          </span>

          <br/>
          <span style={{ textShadow: "none", color: "#000" }} >
            <StyledInput 
            type="text" 
            id="favorite" 
            placeholder="favorite..."
            onChange={handleChange}
            />
          </span>

          <br/>
          <span style={{ textShadow: "none", color: "#000" }} >
            <StyledInput 
            type="text" 
            id="about" 
            placeholder="about..." 
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
            {loading ? 'Loading...' : 'Create'}
            </SaveBtnStyle>
            </div>

          <br/>
        </form>

      {createUserSuccess && (
        <Alert color='success' className='mt-5'>
          {createUserSuccess}
        </Alert>
      )}
      {createUserError && (
        <Alert color='success' className='mt-5'>
          {createUserError}
        </Alert>
      )}
   
      </BackgroundProfileContainer>   
    </>
  );
}

export default NewAccountPage;