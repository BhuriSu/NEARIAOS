import React, { useState, useEffect } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuth, deleteUser } from "firebase/auth";
import './profileEdit.css';
import { BackgroundProfileContainer, BackToListPage,
   LogOutLine, StyledInput, BelowDelete } from './profileEditsElements';
import { Button } from '@mui/material';
import { useUserAuth } from '../Context/UserAuthContext';
import UploadPhoto from './UploadPhoto';
function ProfileEdit() {
  const btnStyle = { marginTop: 5,backgroundColor: '#ff0000',color:'#000' };
  const SaveBtnStyle = { marginTop: 5,backgroundColor: '#2f00ff',color:'#fff'};
  const [workplace, setWorkplace] = useState("");
  const [beverage, setBeverage] = useState("");
  const [favorite, setFavorite] = useState("");
  const [about, setAbout] = useState("");
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  const { id } = useParams();
        
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/user/profile/${id}`, {
        workplace,
        beverage,
        favorite,
        about,
      });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }
  const getUser = async () => {
    const response = await axios.get('/user/users');
    setWorkplace(response.data);
    setBeverage(response.data);
    setFavorite(response.data);
    setAbout(response.data);
  };
  useEffect(() => {
    getUser();
  }, []);


  const getUserById = async () => {
    const response = await axios.get(`/user/profile/${id}`);
    setWorkplace(response.data);
    setBeverage(response.data);
    setFavorite(response.data);
    setAbout(response.data);
  };

  useEffect(() => {
    getUserById();
  }, []);

  function handleChangeAbout(e) {
    e.preventDefault();
    setAbout(e.target.value);
  }
  function handleChangeBeverage(e) {
    e.preventDefault();
    setBeverage(e.target.value);
  }
  function handleChangeFavorite(e) {
    e.preventDefault();
    setFavorite(e.target.value);
  }
  function handleChangeWorkplace(e) {
    e.preventDefault();
    setWorkplace(e.target.value);
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
      deleteUser(user);
      await axios.delete(`/user/profile/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      
      <BackgroundProfileContainer >
        <div style={{ alignSelf: 'center' }}>
          <label htmlFor='file-input'>
          <UploadPhoto />
          </label>
        </div>
        <br/>
        <form onSubmit={updateUser}>
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
        <Button style={SaveBtnStyle} type="submit" variant='contained'>
            Save changes
        </Button>
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
        <Button variant='contained' style={btnStyle} 
        onClick={DeleteUser}>
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