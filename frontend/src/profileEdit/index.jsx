import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAuth, deleteUser, signOut } from "firebase/auth";
import {
  ref, uploadBytesResumable, getDownloadURL, deleteObject
} from "firebase/storage";
import { db, storage } from "../Firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { BackgroundProfileContainer, BackToListPage, DobContainer,
   LogOutLine, FormEditProfile, StyledInput, Avatar, InputAvatar,
   SaveBtnStyle, BelowDelete } from "./profileEditsElements";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ProfileEdit({ onSubmit }) {
  const BtnStyle = { marginTop: 5,backgroundColor: "#ff0000",color:"#000" };
  const navigate = useNavigate();
  const [url, setUrl] = useState("./images/UploadPic.png");
  const { id } =  useParams();
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [beverage, setBeverage] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [favorite, setFavorite] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    if (id) {
    axios.get(`/users/profiles/${id}`)
      .then(res => {
        setUsername(res.data.username);
        setDob(res.data.dob);
        setBeverage(res.data.beverage);
        setWorkplace(res.data.workplace);
        setFavorite(res.data.favorite);
        setAbout(res.data.about);
      })
      .catch(error => {
        console.log(error);
      });
 }}, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const { data } = await axios.post('/users/profiles', { username, dob, beverage, workplace, favorite, about });
    onSubmit(data);
    navigate('/profile');
    } catch (err) {
    console.error('Error creating profile', err);
    }
    };

  const handleUpdate  = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(`/users/profiles/${id}`,{
        username,
        dob,
        beverage,
        workplace,
        favorite,
        about
      });
      onSubmit(data);
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };


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
      const auth = getAuth();
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  const DeleteUser = async (id) => {
    try {
      // Delete Firebase account
      const auth = getAuth();
      const user = auth.currentUser;
      await deleteUser(user);
  
      // Delete database information
      const userRef = doc(db, "users", id);
      await deleteDoc(userRef);
  
      // Delete Firebase storage
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      await deleteObject(avatarRef);
      navigate('/');
      console.log("User deleted successfully.");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <BackgroundProfileContainer >
        <FormEditProfile onSubmit={id ? handleUpdate : handleSubmit} >
        <div style={{ alignSelf: "center" }}>
        <label htmlFor="file-input">
        <Avatar style={{ backgroundImage: `url(${url})` }} />
        </label>
        <InputAvatar id="file-input" type="file" title="upload" onChange={Photo} />
        </div>
        <span style={{ textShadow: "none", color: "#fff" }} >
            username: 
            <label>
            <StyledInput
             type="text"
             name = "username"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             required
           />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Date of birth: 
           <DobContainer>
            
           <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DatePicker
                 label="DOB"
                 inputFormat="YYYY-MM-DD"
                 name = "date of birth"
                 value={dob}
                 onChange={(date) => setDob(date)}
                 textField={(props) => <StyledInput {...props} />}
            />
          </LocalizationProvider>
            </DobContainer>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Beverage:
            <label>
            <StyledInput
              type="text"
              name = "beverage"
              value={beverage}
              onChange={(e) => setBeverage(e.target.value)}
            />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Workplace: 
            <label>
            <StyledInput
              type="text"
              name = "workplace"
              value={workplace}
              onChange={(e) => setWorkplace(e.target.value)}
            />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Favorite:
            <label>
            <StyledInput
              type="text"
              name = "favorite"
              value={favorite}
              onChange={(e) => setFavorite(e.target.value)}
            />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            About:
            <label>
            <StyledInput
              type="text"
              name = "about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>
          </span>
          <br/>
            <SaveBtnStyle type="submit" variant="contained">
            {id ? 'Update' : 'Create'} 
            </SaveBtnStyle>
        </FormEditProfile>
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