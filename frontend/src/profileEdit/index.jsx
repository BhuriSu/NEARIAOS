import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ref, uploadBytesResumable, getDownloadURL, getStorage
} from 'firebase/storage';
import { getAuth, deleteUser } from "firebase/auth";
import './profileEdit.css';
import { BackgroundProfileContainer, Avatar, BackToListPage, LogOutLine, StyledInput, BelowDelete } from './profileEditsElements'
import { Button } from '@mui/material';
import { useUserAuth } from '../Context/UserAuthContext';

function ProfileEdit() {
  const btnStyle = { marginTop: 5,backgroundColor: '#ff0000',color:'#000' };
  const SaveBtnStyle = { marginTop: 5,backgroundColor: '#2f00ff',color:'#fff'}
  const [ cookies ] = useCookies(['user'])
  const userId = cookies.UserId
  const [user, setUser] = useState(null)
  const [workplace, setWorkplace] = useState('');
  const [beverage, setBeverage] = useState('');
  const [favorite, setFavorite] = useState('');
  const [about, setAbout] = useState('');
  const [url, setUrl] = useState('./images/UploadPic.svg');
  const [save, setSave] = useState('');
  const id = cookies.user;
  const [image, setImage] = useState(null);
  const { logout } = useUserAuth();
  const navigate = useNavigate();

  function patchData(event) {
    event.preventDefault();
    axios
      .patch('/users/profile', {
        workplace,
        beverage,
        favorite,
        about,
        id,
      })
      .then(({ data }) => {
        if (data.success) {
          setSave('Changes were saved');
        } else {
          setSave(data.err);
        }
      });
    const storage = getStorage();
    const storageRef = ref(storage, `images/${cookies.user || './images/infoUser.svg'}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      () => {
        setUrl('./loading.gif');
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.log('storage is unauthorized');
            break;
          case 'storage/canceled':
            console.log('storage is canceled');
            break;
          case 'storage/unknown':
            console.log('storage is unknown');
            break;
          default:
            console.log('sorry it is not about storage');
        }
      },
      () => {
        getDownloadURL(storageRef).then((url) => {
          setUrl(url);
        });
      },
    );
    if (setUrl !== null || setUrl == null) {
      axios
        .patch('/users/profile', {
          workplace,
          beverage,
          favorite,
          about,
          id,
          avatar: url,
        })
        .then(({ data }) => {
          if (data.success) {
            setSave('Saved');
          } else {
            setSave(data.err);
          }
        });
    }
  }

  function handleChangeAbout(event) {
    event.preventDefault();
    setAbout(event.target.value);
  }
  function handleChangeBeverage(event) {
    event.preventDefault();
    setBeverage(event.target.value);
  }
  function handleChangeFavorite(event) {
    event.preventDefault();
    setFavorite(event.target.value);
  }
  function handleChangeWorkplace(event) {
    event.preventDefault();
    setWorkplace(event.target.value);
  }
  const LogOut = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  }

  function photoDownload(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const storage = getStorage();
      const storageRef = ref(storage, `images/${cookies.user}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        () => {
          setUrl('./loading.gif');
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(storageRef)
            .then((url) => {
              setUrl(url);
            });
        },
      );
    }
  }
 
  const getUser = async () => {
    try {
        const response = await axios.get('/users/:id', {
            params: {userId}
        })
        setUser(response.data)
    } catch (error) {
        console.log(error)
    }
}
  useEffect(() => {
    getUser();
  }, []); 

   function handleDelete(){
    const auth = getAuth();
    const user = auth.currentUser;
    deleteUser(user).then(() => {
    }).catch((error) => {
      const errorMessage = error.message;
      if (errorMessage) {
        alert("user account was deleted");
      }
    });
  }

  return (
    <>
        {user &&
      <BackgroundProfileContainer user={user} >
        <div style={{ alignSelf: 'center' }}>
          <label htmlFor='file-input'>
          <Avatar style={{ backgroundImage: `url(${url})` }} />
          <input id='file-input' type='file' title='upload' onChange={photoDownload} />
          </label>
        </div>
        <br/>
        <form onSubmit={patchData}>
        
          
          <span
            style={{ textShadow: 'none', color: '#fff' }}
          >
            Workplace: 
            <label>
            <StyledInput
              title='workplace'
              value={workplace}
              onChange={handleChangeWorkplace}
              type='text'
              name='workplace'
              required
            />
          </label>
          </span>
          <br/>
          <span
            style={{ textShadow: 'none',  color: '#fff' }}
          >
            Favorite:
            <label>
            <StyledInput
              title='favorite'
              value={favorite}
              onChange={handleChangeFavorite}
              type='text'
              name='favorite'
              required
            />
          </label>
          </span>
          <br/>
          <span
            style={{ textShadow: 'none', color: '#fff' }}
          >
            About:
            <label>
            <StyledInput
              title='about'
              value={about}
              onChange={handleChangeAbout}
              type='text'
              name='about'
              required
            />
          </label>
          </span>
          <br/>
          <span
            style={{ textShadow: 'none', color: '#fff' }}
          >
            Beverage:
            <label>
            <StyledInput
              title='beverage'
              value={beverage}
              onChange={handleChangeBeverage}
              type='text'
              name='beverage'
              required
            />
          </label>
          </span>
     
       
        </form>
        <br/>
        <br/>
        <Button style={SaveBtnStyle}  variant='contained'>
            Save changes
        </Button>
        <div style={{ marginTop: '15px', color: '#fff' }}>
            {' '}
            {save}
        </div>
        <br/>
        <br/>
          <Link to='/listUsers' style={{ position: 'relative' }}>
          <BackToListPage>
          Back to ListPage
          </BackToListPage>
          </Link>
   
        <br/>
      
          <Link to='/startForm' onClick={LogOut} style={{ position: 'relative' }}>
          <LogOutLine>
           Log out
          </LogOutLine>
          </Link>
    
        <br/>
        <Button variant='contained' style={btnStyle} onClick={handleDelete} >
					Delete
				</Button>
        <BelowDelete>
        After click button your account will be deleted when log out
        </BelowDelete>
       
      </BackgroundProfileContainer>}
      
    </>
  );
}

export default ProfileEdit;
