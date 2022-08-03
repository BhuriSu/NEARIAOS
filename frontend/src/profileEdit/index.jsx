import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  ref, uploadBytesResumable, getDownloadURL, getStorage
} from 'firebase/storage';
import { profileInit } from '../redux/action';
import NavbarNewFeed from '../NewFeedComponents/NavbarNewFeed';
import './profileEdit.css';

function ProfileEdit(props) {
  const [cookies, removeCookies] = useCookies([
    'userName',
    'userNickname',
  ]);
  const [activity, setActivity] = useState('');
  const [drinks, setDrinks] = useState('');
  const [topics, setTopics] = useState('');
  const [about, setAbout] = useState('');
  const [url, setUrl] = useState('./images/UploadPic.svg');
  const [save, setSave] = useState('');
  const id = cookies.userName;
  const { profileInit, user } = props;
  const [image, setImage] = useState(null);
 

  function patchData(event) {
    event.preventDefault();
    axios
      .patch('/users/profile', {
        activity,
        drinks,
        topics,
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
    uploadTask.on('state_changed', undefined, undefined, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setUrl(url);
      });
    });
    if (setUrl !== null || setUrl == null) {
      axios
        .patch('/users/profile', {
          activity,
          drinks,
          topics,
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
  function handleChangeDrinks(event) {
    event.preventDefault();
    setDrinks(event.target.value);
  }
  function handleChangeTopics(event) {
    event.preventDefault();
    setTopics(event.target.value);
  }
  function handleChangeActivity(event) {
    event.preventDefault();
    setActivity(event.target.value);
  }
  function LogOut() {
    user.id = null;
    removeCookies('userName');
    removeCookies('userNickname');
  }

  useEffect(() => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `images/${cookies.userName}`))
      .then((url) => {
        setUrl(url);
      });
    axios
      .post('/users/profileEdit', {
        id,
      })
      .then(({ data }) => {
        setActivity(data.profileId.activity);
        setDrinks(data.profileId.drinks);
        setAbout(data.profileId.about);
        setTopics(data.profileId.topics);
        profileInit(data.profileId);
      });
  }, [profileInit, id, cookies.userName]);

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

  return (
    <>
      <NavbarNewFeed />
      <div className="profile-container">
        <div style={{ alignSelf: 'center' }}>
          <label htmlFor="file-input">
            <div
              className="avatar"
              style={{ backgroundImage: `url(${url})` }}
            />
          </label>
          <input id="file-input" type="file" onChange={photoDownload} />
        </div>
        <form onSubmit={patchData} className="edit">
          <span
            style={{
              textShadow: 'none',
              marginBottom: '8px',
              marginTop: '0px',
              color: '#fff',
            }}
          >
            Activity:
          </span>
          <label>
            <input
              value={activity}
              onChange={handleChangeActivity}
              type="text"
              name="activity"
              required
              className="profileInput"
            />
          </label>
          <span
            style={{ textShadow: 'none', marginBottom: '8px', color: '#fff' }}
          >
            Topics:
          </span>
          <label>
            <input
              value={topics}
              onChange={handleChangeTopics}
              type="text"
              name="topics"
              required
              className="profileInput"
            />
          </label>
          <span
            style={{ textShadow: 'none', marginBottom: '8px', color: '#fff' }}
          >
            About:
          </span>
          <label>
            <input
              value={about}
              onChange={handleChangeAbout}
              type="text"
              name="about"
              required
              className="profileInput"
            />
          </label>
          <span
            style={{ textShadow: 'none', marginBottom: '8px', color: '#fff' }}
          >
            Drinks:
          </span>
          <label>
            <input
              value={drinks}
              onChange={handleChangeDrinks}
              type="text"
              name="drinks"
              required
              className="profileInput"
            />
          </label>
          <button
            style={{
              margin: '0 auto',
              width: '95%',
              height: '100%',
            }}
            className="chatButton"
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

    

        <div className="exit" style={{ margin: '0' }}>
          <Link to="/login" onClick={LogOut} style={{ position: 'relative' }}>
            <img src="./images/exit.svg" alt="Logout" title="Logout" />
          </Link>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  profileId: state.user.profileId,
  user: state.user,
  err: state.error,
});
const mapDispatchToProps = (dispatch) => ({
  profileInit: (profileId) => dispatch(profileInit(profileId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
