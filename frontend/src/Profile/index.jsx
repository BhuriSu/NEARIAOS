import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//firebase
import { getAuth, deleteUser, signOut } from "firebase/auth";
import {
  ref, deleteObject, uploadBytesResumable, getDownloadURL
} from "firebase/storage";
import { storage } from "../Firebase/firebase";

// css 
import { BackgroundProfileContainer, BackToListPage, DobContainer,
   LogOutLine, FormEditProfile, StyledInput,
   SaveBtnStyle, BelowDelete, Avatar, InputAvatar } from "./profileElements";
import { Button } from "@mui/material";

//date of birth 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { toast } from "react-toastify";

function ProfileEdit() {
  const BtnStyle = { marginTop: 5,backgroundColor: "#ff0000",color:"#000" };
  const navigate = useNavigate();
  const [url, setUrl] = useState("./images/UploadPic.png");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [beverage, setBeverage] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [favorite, setFavorite] = useState('');
  const [about, setAbout] = useState('');

  const createData = async(e) => {
    e.preventDefault();
    if(username === "" || dob === ""){
        toast.error('Please fill out username and date of birth completely');
        return;
    }
    try {
        setIsLoading(true);
        const response = await axios.post("http://localhost:27017/profiles", 
        {username: username, dob: dob, beverage: beverage, workplace: workplace, favorite:favorite, about:about});
        toast.success(`Save ${response.data.name} Successfully`);
        setIsLoading(false);
        navigate("/profiles");
    } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
    }
  }

  function Photo(e) {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
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
      const auth = getAuth();
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  const DeleteUser = async (id) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      // Delete Firebase storage
      const avatarRef = ref(storage, `images/${user.uid}`);
      await deleteObject(avatarRef);
      navigate('/');
      // Delete Firebase account
      await deleteUser(user);
  
      console.log("User deleted successfully.");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <BackgroundProfileContainer >
        <FormEditProfile onSubmit={createData} >

        <div style={{ alignSelf: "center" }}>
        <label htmlFor="file-input">
        <Avatar style={{ backgroundImage: `url(${url})` }} />
        </label>
        <InputAvatar id="file-input" type="file" title="upload" onChange={Photo} />
        </div>

          <span style={{ textShadow: "none", color: "#fff" }} >
            Username: 
            <label>
            <StyledInput type="text" name="username" placeholder="name..." value={username || ''} onChange={(e) => setUsername(e.target.value)} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Date of birth: 
           <DobContainer>
           <LocalizationProvider dateAdapter={AdapterDayjs} type="date" name="date" value={dob || ''} onChange={(e) => setDob(e.target.value)} >
           <DatePicker />
           </LocalizationProvider>
           </DobContainer>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Beverage:
            <label>
            <StyledInput type="text" name="beverage" placeholder="beverage..." value={beverage || ''} onChange={(e) => setBeverage(e.target.value)} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Workplace: 
            <label>
            <StyledInput type="text" name="workplace" placeholder="workplace..." value={workplace || ''} onChange={(e) => setWorkplace(e.target.value)} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Favorite:
            <label>
            <StyledInput type="text" name="favorite" placeholder="favorite..." value={favorite || ''} onChange={(e) => setFavorite(e.target.value)} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            About:
            <label>
            <StyledInput type="text" name="about" placeholder="about..." value={about || ''} onChange={(e) => setAbout(e.target.value)} />
          </label>
          </span>
          <br/>
          { !isLoading && 
            <SaveBtnStyle>
            save
            </SaveBtnStyle>
          }
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
        <Button variant="contained" style={BtnStyle} onClick={DeleteUser}>
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