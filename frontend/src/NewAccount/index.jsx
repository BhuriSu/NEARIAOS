import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { firebase } from '../Firebase';
import { getAuth, signOut } from "firebase/auth";

// Redux
import {
  createStart,
  createSuccess,
  createFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
} from '../redux/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import UserAvatar from './UserAvatar';

// CSS
import {
  BackgroundProfileContainer,
  StyledInput,
  DivImage,
  SaveBtnStyle,
  DeleteBtnStyle,
  BackToListPage, 
  LogOutLine,
} from "./NewAccountElements";
import { CircularProgressbar } from 'react-circular-progressbar';
import { Alert } from 'flowbite-react';

function NewAccountPage() {
  const [formData, setFormData] = useState({
    username: '',
    date: '',
    beverage: '',
    workplace: '',
    favorite: '',
    about: '',
    profilePicture: ''
  });
  const { loading } = useSelector((state) => state.user);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [userSuccess, setUserSuccess] = useState(null);
  const [userError, setUserError] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch('/api/users/${userId}'); // Adjust this with your API endpoint and user identifier
        const data = await res.json();
        setFormData(data);
        setIsUpdateMode(true);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    if (!formData.username) { // Only fetch if formData is empty
      fetchProfileData();
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
      setIsUpdateMode(true);
    }
  }, [location.state]);

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
        setImageFileUploadError(error.message);
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserError(null);
    setUserSuccess(null);

    if (!formData.username || !formData.date) {
      setUserError('Please fill in all required fields');
      return;
    }

    if (imageFileUploading) {
      setUserError('Please wait for image to upload');
      return;
    }

    try {
      if (isUpdateMode) {
        dispatch(updateStart());
        const res = await fetch('/api/users/update/${userId}', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(updateFailure(data.message));
          setUserError(data.message);
        } else {
          dispatch(updateSuccess(data));
          setUserSuccess("User's profile updated successfully");
        }
      } else {
        dispatch(createStart());
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
          setUserError(data.message);
        } else {
          dispatch(createSuccess(data));
          setUserSuccess("User profile created successfully");
          navigate('/listUser', { state: { formData } });
        }
      }
    } catch (error) {
      setUserError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteStart());
      const res = await fetch('/api/users/delete/${userId}', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: formData.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
        setUserError(data.message);
      } else {
        dispatch(deleteSuccess());
        setUserSuccess("User profile deleted successfully");
        navigate('/');
      }
    } catch (error) {
      setUserError(error.message);
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
      <BackgroundProfileContainer>
        <form onSubmit={handleSubmit}>
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
                      root: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 },
                      path: { stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})` },
                    }}
                  />
                )}
                <UserAvatar
                  profilePicture={imageFileUrl}  
                  height={100} 
                  width={100} 
                  alt='user'
                  className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-50'}`}
                />
              </div>
              {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
            </DivImage>
          </div>

          <StyledInput  
            type='text'
            name='username'
            id='username'
            placeholder='username...'
            onChange={handleChange} 
          />
          <br/>

          <div style={{ backgroundColor: '#9645ff', borderRadius: '20px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
            <input 
              type="date" 
              name="date"
              id="date" 
              onChange={handleChange}
              style={{ border: 'none', background: 'transparent', color: '#000', outline: 'none', textAlign: 'center' }}
            />
          </div>
          <br/>

          <StyledInput 
            type="text" 
            name="beverage" 
            id="beverage" 
            placeholder="beverage..." 
            onChange={handleChange} 
          />
          <br/>

          <StyledInput 
            type="text" 
            name="workplace" 
            id="workplace" 
            placeholder="workplace..." 
            onChange={handleChange} 
          />
          <br/>

          <StyledInput 
            type="text" 
            name="favorite" 
            id="favorite" 
            placeholder="favorite..."
            onChange={handleChange}
          />
          <br/>

          <StyledInput 
            type="text" 
            name="about" 
            id="about" 
            placeholder="about..." 
            onChange={handleChange}
          />
          <br/>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SaveBtnStyle
              type='submit'
              outline
              disabled={loading || imageFileUploading}
              className='rounded-md bg-primary py-2 px-3 text-md shadow-lg hover:bg-green-700 hover:text-lightgray'
            >
              {loading ? 'Saving...' : isUpdateMode ? 'Update Profile' : 'Save Profile'}
            </SaveBtnStyle>
          </div>
        
           <br/>
          <Link to="/listUser">
          <BackToListPage>
          Back to ListPage
          </BackToListPage>
          </Link>

          <Link to="/startForm" onClick={LogOut}>
          <LogOutLine>
           Log out
          </LogOutLine>
          </Link>

          <br/>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          {isUpdateMode && (
              <DeleteBtnStyle
                outline
                onClick={handleDelete}
                className='rounded-md bg-red-700 py-2 px-3 text-md shadow-lg hover:bg-red-700 hover:text-lightgray'
              >
                Delete
              </DeleteBtnStyle>
            )}
          </div>
        </form>
        {userSuccess && <Alert color="success">{userSuccess}</Alert>}
        {userError && <Alert color="failure">{userError}</Alert>}
      </BackgroundProfileContainer>
    </>
  );
}

export default NewAccountPage;
