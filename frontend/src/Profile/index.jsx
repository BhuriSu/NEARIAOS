import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth, deleteUser, signOut } from "firebase/auth";
import {
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../Firebase/firebase";
import { BackgroundProfileContainer, BackToListPage, DateContainer, LogOutLine, FormEditProfile, StyledInput, SaveBtnStyle, BelowDelete, Avatar, InputAvatar } from "./profileElements";
import { Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ProfileEdit() {
  const BtnStyle = { marginTop: 5, backgroundColor: "#ff0000", color: "#000" };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    date: '',
    beverage: '',
    workplace: '',
    favorite: '',
    about: '',
    image: null,
  });

  const [url, setUrl] = useState("./images/UploadPic.png");

  // Function to upload photo to Firebase storage
  const uploadPhoto = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    await uploadTask;

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    setUrl(downloadURL);

    return downloadURL;
  };

  // Function to save profile to MongoDB and Firebase
  const saveProfile = async () => {
    try {
      const imageUrl = formData.image ? await uploadPhoto(formData.image) : null;

      // Save data to MongoDB
      const response = await axios.post('http://localhost:27017/profiles', {
        username: formData.username,
        date: formData.date,
        beverage: formData.beverage,
        workplace: formData.workplace,
        favorite: formData.favorite,
        about: formData.about,
        imageUrl,
      });

      if (response.status === 200) {
        alert('Profile created successfully');
      } else {
        alert('Failed to create profile');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Internal Server Error');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveProfile();
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
    setUrl(URL.createObjectURL(e.target.files[0]));
  };

  // Function to delete user from MongoDB and Firebase
  const deleteUserFromFirebaseAndMongo = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Delete Firebase storage
      const avatarRef = ref(storage, `images/${user.uid}`);
      await deleteObject(avatarRef);

      // Delete from MongoDB
      // Replace the following line with the actual API endpoint for deleting a user
      const response = await axios.delete(`http://localhost:27017/profiles/${user.uid}`);

      if (response.status === 200) {
        console.log("User deleted successfully from MongoDB.");
      } else {
        console.log('Failed to delete user from MongoDB.');
      }

      navigate('/');
      
      // Delete Firebase account
      await deleteUser(user);

      console.log("User deleted successfully from Firebase.");
    } catch (error) {
      console.log(error);
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
        <FormEditProfile onSubmit={handleSubmit} >

        <div style={{ alignSelf: "center" }}>
        <label htmlFor="image">
        <Avatar style={{ backgroundImage: `url(${formData.image ? URL.createObjectURL(formData.image) : url})` }} />
        </label>
        <InputAvatar type="file" id="image" title="upload" onChange={handleImageChange}  />
        </div>

          <span style={{ textShadow: "none", color: "#fff" }} >
            Username: 
            <label>
            <StyledInput type="text" id="username" name="username" placeholder="name..." value={formData.username} onChange={handleInputChange} required />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Date of birth: 
           <DateContainer>
           <LocalizationProvider dateAdapter={AdapterDayjs} type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required >
           <DatePicker />
           </LocalizationProvider>
           </DateContainer>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Beverage:
            <label>
            <StyledInput type="text" id="beverage" name="beverage" placeholder="beverage..." value={formData.beverage} onChange={handleInputChange} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Workplace: 
            <label>
            <StyledInput type="text" id="workplace" name="workplace" placeholder="workplace..." value={formData.workplace} onChange={handleInputChange} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Favorite:
            <label>
            <StyledInput type="text" id="favorite" name="favorite" placeholder="favorite..." value={formData.favorite} onChange={handleInputChange} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            About:
            <label>
            <StyledInput type="text" id="about" name="about" placeholder="about..." value={formData.about} onChange={handleInputChange} />
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