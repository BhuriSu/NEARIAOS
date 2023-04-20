import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuth, deleteUser } from "firebase/auth";
import {
  ref, uploadBytesResumable, getDownloadURL
} from 'firebase/storage';
import {storage} from '../Firebase/firebase';
import './profileEdit.css'; 
import { BackgroundProfileContainer, BackToListPage, DobContainer,
   LogOutLine, FormEditProfile, StyledInput, Avatar, BelowDelete } from './profileEditsElements';
import { Button } from '@mui/material';
import { useUserAuth } from '../Context/UserAuthContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ProfileEdit() {
  const btnStyle = { marginTop: 5,backgroundColor: '#ff0000',color:'#000' };
  const SaveBtnStyle = { marginTop: 5,backgroundColor: '#2f00ff',color:'#fff'};
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [url, setUrl] = useState('./images/UploadPic.png');
  const [workplace, setWorkplace] = useState("");
  const [beverage, setBeverage] = useState("");
  const [favorite, setFavorite] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await  axios.patch(`/users/profile/${id}`, {
          name,
          dob,
          workplace,
          beverage,
          favorite,
          about
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        alert("successfully updated");
        navigate("/profile");
      }
    } catch (error) {
      alert("something wrong");
      console.log(error);
    }
  }
  useEffect(() => {
    const getUserById = async () => {
      try {
        if (id) {
          const response = await axios.get(`/users/profile/${id}`);
          setWorkplace(response.data.workplace);
          setBeverage(response.data.beverage);
          setFavorite(response.data.favorite);
          setAbout(response.data.about);
          setName(response.data.name);
          setDob(response.data.dob);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserById();
  }, [id]);

  function handleChangeWorkplace(e) {
    setWorkplace(e.target.value);
  }

  function handleChangeBeverage(e) {
    setBeverage(e.target.value);
  }

  function handleChangeFavorite(e) {
    setFavorite(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDob(e) {
    setDob(e.target.value);
  }

  function Photo(e) {
    const file = e.target.files[0];
    const storageRef = ref(storage, `/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("sorry it is not working");
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("storage is unauthorized");
            break;
          case "storage/canceled":
            console.log("storage is canceled");
            break;
          case "storage/unknown":
            console.log("storage is unknown");
            break;
          default:
            console.log("sorry it is not about storage");
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
        });
      }
    );
  }

  const LogOut = async () => {
    try {
      await logout();
      navigate("/");
      console.log('You are logged out')
    } catch (e) {
      const errorMessage = e.message;
      if (errorMessage) {
        alert("user account was deleted");
      }
    }
  }

  const DeleteUser = async (id) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      await deleteUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <BackgroundProfileContainer >
        <FormEditProfile onSubmit={updateUser}>
        <div style={{ alignSelf: 'center' }}>
        <label htmlFor='file-input'>
        <Avatar style={{ backgroundImage: `url(${url})` }} />
        </label>
        <input id='file-input' type='file' title='upload' onChange={Photo} />
        </div>
        <span
            style={{ textShadow: 'none', color: '#fff' }}
          >
            Name: 
            <label>
            <StyledInput
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChangeName}
              required
            />
          </label>
          </span>
          <br/>
          <span
            style={{ textShadow: 'none', color: '#fff' }}
          >
            Date of birth: 
           <DobContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                      label="Date of birth" 
                      id="dob"
                      type="text"
                      name="dob"
                      value={dob}
                      onChange={date => handleChangeDob({ target: { value: date, name: 'dob' } })}
                      required={true}
                      />
            </LocalizationProvider>
            </DobContainer>
          </span>
          <br/>
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
          <br/>
            <Button style={SaveBtnStyle} type="submit" variant='contained'>
            Save 
           </Button>
        </FormEditProfile>
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
        <Button variant='contained' style={btnStyle} onClick={DeleteUser}>
					Delete
				</Button>
        <BelowDelete>
        After click button your account will be deleted when log out
        </BelowDelete>
      </BackgroundProfileContainer>   
    </>
  );
}

export default ProfileEdit;