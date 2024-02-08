import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth, deleteUser, signOut } from "firebase/auth";
import {
  ref,
  deleteObject,
  getStorage,
  getDownloadURL,
  uploadBytes
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
    profileImage: null,
  });

  const [url] = useState("./images/UploadPic.png");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    // Upload image to Firebase Storage
    const storage = getStorage();

    // Reference to the root of your storage bucket
    const storageRef = ref(storage);

    // Reference to the image path
    const imageRef = ref(storageRef, `profile_images/${formData.username}`);

    // Upload the image to Firebase Storage
    await uploadBytes(imageRef, formData.profileImage);

    // Get image URL
    const imageUrl = await getDownloadURL(imageRef);

    await axios.post("http://localhost:27017/profiles", { ...formData, profileImage: imageUrl });

    // Reset form data after submission
      setFormData({
        username: '',
        date: '',
        beverage: '',
        workplace: '',
        favorite: '',
        about: '',
        profileImage: null,
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
        <Avatar style={{ backgroundImage: `url(${url})` }} />
        </label>
        <InputAvatar type="file" id="image" title="upload" onChange={handleImageChange}  />
        </div>

          <span style={{ textShadow: "none", color: "#fff" }} >
            Username: 
            <label>
            <StyledInput type="text" id="username" name="username" placeholder="name..." value={formData.username}  onChange={handleChange} required />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Date of birth: 
           <DateContainer>
           <LocalizationProvider dateAdapter={AdapterDayjs} type="date" id="date" name="date" value={formData.date} onChange={handleChange} required >
           <DatePicker />
           </LocalizationProvider>
           </DateContainer>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Beverage:
            <label>
            <StyledInput type="text" id="beverage" name="beverage" placeholder="beverage..." value={formData.beverage} onChange={handleChange} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Workplace: 
            <label>
            <StyledInput type="text" id="workplace" name="workplace" placeholder="workplace..." value={formData.workplace} onChange={handleChange} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Favorite:
            <label>
            <StyledInput type="text" id="favorite" name="favorite" placeholder="favorite..." value={formData.favorite} onChange={handleChange} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            About:
            <label>
            <StyledInput type="text" id="about" name="about" placeholder="about..." value={formData.about} onChange={handleChange} />
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