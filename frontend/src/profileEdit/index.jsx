import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  ref, uploadBytesResumable, getDownloadURL, getStorage
} from 'firebase/storage';
import './profileEdit.css';
import styled from 'styled-components';
const Avatar = styled.div`
width: 250px;
height: 250px;
border-radius: 50%;
background-size: cover;
background-position: center;
cursor: pointer;
`;

function ProfileEdit(props) {
  const [cookies, removeCookies] = useCookies([
    'userName',
    'userNickname',
  ]);
  const [workplace, setWorkplace] = useState('');
  const [beverage, setBeverage] = useState('');
  const [favorite, setFavorite] = useState('');
  const [about, setAbout] = useState('');
  const [url, setUrl] = useState('./images/UploadPic.svg');
  const [save, setSave] = useState('');
  const id = cookies.userName;
  const { user } = props;
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { _id } = useParams();

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
    const storageRef = ref(storage, `images/${cookies.userName || './images/infoUser.svg'}`);
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
  function LogOut() {
    user.id = null;
    removeCookies('userName');
    removeCookies('userNickname');
  }


  function photoDownload(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const storage = getStorage();
      const storageRef = ref(storage, `images/${cookies.userName}`);
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

  async function handleDelete(){
    try {
			await axios.delete(`/users/delete/${_id}`);
			navigate('/');
		} catch (error) {
			console.error(error);
		}
  }

  return (
    <>
     
      <div className='profile-container'>
        <div style={{ alignSelf: 'center' }}>
          <label htmlFor='file-input'>
          <Avatar style={{ backgroundImage: `url(${url})` }} />
          <input id='file-input' type='file' title='upload' onChange={photoDownload} />
          </label>
         
        </div>

        <form onSubmit={patchData} className='edit'>
          <span
            style={{ textShadow: 'none', marginBottom: '8px', color: '#fff' }}
          >
            Workplace:
          </span>
          <label>
            <input
              title='workplace'
              value={workplace}
              onChange={handleChangeWorkplace}
              type='text'
              name='workplace'
              className='profileInput'
              required
            />
          </label>
          <span
            style={{ textShadow: 'none', marginBottom: '8px', color: '#fff' }}
          >
            Favorite:
          </span>
          <label>
            <input
              title='favorite'
              value={favorite}
              onChange={handleChangeFavorite}
              type='text'
              name='favorite'
              className='profileInput'
              required
            />
          </label>
          <span
            style={{ textShadow: 'none', marginBottom: '8px', color: '#fff' }}
          >
            About:
          </span>
          <label>
            <input
              title='about'
              value={about}
              onChange={handleChangeAbout}
              type='text'
              name='about'
              className='profileInput'
              required
            />
          </label>
          <span
            style={{ textShadow: 'none', marginBottom: '8px', color: '#fff' }}
          >
            Beverage:
          </span>
          <label>
            <input
              title='beverage'
              value={beverage}
              onChange={handleChangeBeverage}
              type='text'
              name='beverage'
              className='profileInput'
              required
            />
          </label>
          <button
            style={{ margin: '0 auto' }}
            className='saveButton'
          >
            {' '}
            Save changes
            {' '}
          </button>
          <div style={{ marginTop: '15px', color: '#fff' }}>
            {' '}
            {save}
          </div>
        </form>

        <div className='quitEdit' style={{ margin: '0 auto' }}>
          <Link to='/listUsers' style={{ position: 'relative' }}>
           <img src='./images/back.svg' width='100' height='100' alt='BackToListPage' title='BackToListPage' />
          </Link>
        </div>

        <div className='exit' style={{ margin: '0 auto' }}>
          <Link to='/login' onClick={LogOut} style={{ position: 'relative' }}>
            <img src='./images/exit.svg' width='100' height='100' alt='Logout' title='Logout' />
          </Link>
        </div>
  
        <button onClick={handleDelete} className='deleteAccount'>
					Delete
				</button>
       
      </div>
    </>
  );
}

export default ProfileEdit;
