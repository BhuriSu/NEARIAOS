import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";

//firebase
import { getAuth, deleteUser, signOut } from "firebase/auth";
import {
  ref,
  deleteObject,
  getStorage,
  getDownloadURL,
  uploadBytesResumable
} from "firebase/storage";
import { storage } from "../Firebase/firebase";

// css 
import { BackgroundProfileContainer, BackToListPage, DateContainer, LogOutLine,
   FormEditProfile, StyledInput, SaveBtnStyle, BelowDelete, Avatar, InputAvatar } from "./profileElements";
import { Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ProfileEdit() {
  const BtnStyle = { marginTop: 5, backgroundColor: "#ff0000", color: "#000" };
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState({
    username: '',
    date: '',
    beverage: '',
    workplace: '',
    favorite: '',
    about: '',
    imageUrl: null,
  });
   
  const [url, setUrl] = useState("./images/UploadPic.png");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.files[0] });
  };

  const onSubmit = async (data) => {
    try {
    const storage = getStorage();
    const imageRef = ref(storage, `profile_images/${formData.username}`);
    // Upload the image to Firebase Storage
    const uploadTask = uploadBytesResumable(imageRef, formData.imageUrl);
    uploadTask.on('state_changed', 
    (snapshot) => {
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log('Upload is ' + progress + '% done');
         switch (snapshot.state) {
             case 'paused':
               console.log('Upload is paused');
               break;
             case 'running':
               console.log('Upload is running');
               break;
             default: 
               console.log('sorry it is not working');
       }
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
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setUrl(url);
      console.log('File available at', downloadURL);
    });
  }
);
    const imageUrl = await imageRef.getDownloadURL();
    await axios.post("http://localhost:27017/profiles",  {
      username: data.username,
      date: data.date,
      beverage: data.beverage,
      workplace: data.workplace,
      favorite: data.favorite,
      about: data.about,
      image: imageUrl,
    });

      alert('Profile submitted successfully!');
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };

  // Function to delete user from MongoDB and Firebase
  const deleteUserFromFirebaseAndMongo = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      const avatarRef = ref(storage, `images/${user.uid}`);
      await deleteObject(avatarRef);

      const response = await axios.delete(`http://localhost:27017/profiles/${user.uid}`);

      if (response.status === 200) {
        console.log("User deleted successfully from MongoDB.");
      } else {
        console.log('Failed to delete user from MongoDB.');
      }
      await deleteUser(user);
      navigate('/');
      console.log("User deleted successfully from Firebase.");
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  // Handle log out and delete user
  const handleLogOutAndDeleteUser = async () => {
    await deleteUserFromFirebaseAndMongo();
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
        <FormEditProfile onSubmit={handleSubmit(onSubmit)}>

        <div style={{ alignSelf: "center" }}>
        <label htmlFor="image">
        <Avatar style={{ backgroundImage: `url(${url})` }} />
        </label>
        <InputAvatar type="file" id="image" title="upload" onChange={handleImageChange}  />
        </div>

          <span style={{ textShadow: "none", color: "#fff" }} >
            Username: 
            <label>
            <StyledInput type="text" id="username" name="username" placeholder="name..." {...register('username')}  onChange={handleChange} required />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Date of birth: 
           <DateContainer>
           <LocalizationProvider dateAdapter={AdapterDayjs} type="date" id="date" name="date" {...register('date')} onChange={handleChange} required >
           <DatePicker />
           </LocalizationProvider>
           </DateContainer>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Beverage:
            <label>
            <StyledInput type="text" id="beverage" name="beverage" placeholder="beverage..." {...register('beverage')} onChange={handleChange} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Workplace: 
            <label>
            <StyledInput type="text" id="workplace" name="workplace" placeholder="workplace..." {...register('workplace')} onChange={handleChange} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Favorite:
            <label>
            <StyledInput type="text" id="favorite" name="favorite" placeholder="favorite..." {...register('favorite')} onChange={handleChange} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            About:
            <label>
            <StyledInput type="text" id="about" name="about" placeholder="about..." {...register('about')} onChange={handleChange} />
          </label>
          </span>
          <br/>

            <SaveBtnStyle type="submit">
            save
            </SaveBtnStyle>
          
        </FormEditProfile>

        <br/>
          <Link to="/edit">
          <LogOutLine>
           Edit
          </LogOutLine>
          </Link>
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
        <Button variant="contained" style={BtnStyle} onClick={handleLogOutAndDeleteUser}>
					Delete
				</Button>
        <BelowDelete>
        Your account will be deleted when log out
        </BelowDelete>
      </BackgroundProfileContainer>   
    </>
  );
}

export default ProfileEdit;