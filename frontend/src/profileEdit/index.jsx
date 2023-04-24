import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAuth, deleteUser } from "firebase/auth";
import {
  ref, uploadBytesResumable, getDownloadURL, deleteObject
} from "firebase/storage";
import { db, storage } from "../Firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { BackgroundProfileContainer, BackToListPage, DobContainer,
   LogOutLine, FormEditProfile, StyledInput, Avatar, InputAvatar,
   SaveBtnStyle, BelowDelete } from "./profileEditsElements";
import { Button } from "@mui/material";
import { useUserAuth } from "../Context/UserAuthContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ProfileEdit() {
  const BtnStyle = { marginTop: 5,backgroundColor: "#ff0000",color:"#000" };
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [url, setUrl] = useState("./images/UploadPic.png");
  const [formData, setFormData] = useState({
    workplace: '',
    beverage: '',
    favorite: '',
    about: '',
    name: '',
    dob: ''
  });
  const { name, dob, workplace, beverage, favorite, about } = formData;
  const setName = (e) => setFormData({ ...formData, name: e.target.value });
  const setDob = (date) => setFormData({ ...formData, dob: date });
  const setWorkplace = (e) => setFormData({ ...formData, workplace: e.target.value });
  const setBeverage = (e) => setFormData({ ...formData, beverage: e.target.value });
  const setFavorite = (e) => setFormData({ ...formData, favorite: e.target.value });
  const setAbout = (e) => setFormData({ ...formData, about: e.target.value });

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/users/profiles/${id}`, formData);
      console.log('Profile updated successfully.');
    } catch (error) {
      console.log('Error', error);
    }
  };
  
  useEffect(() => {
    const getUserById = async () => {
      try {
        if (id) {
          const res = await axios.get(`/users/profiles/${id}`);
          setWorkplace(res.data.workplace);
          setBeverage(res.data.beverage);
          setFavorite(res.data.favorite);
          setAbout(res.data.about);
          setName(res.data.name);
          setDob(res.data.dob);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserById();
  }, [id]);

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
      console.log("You are logged out")
    } catch (e) {
      const errorMessage = e.message;
      if (errorMessage) {
        alert("user account was deleted");
      }
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
  
      console.log("User deleted successfully.");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <BackgroundProfileContainer >
        <FormEditProfile onSubmit={updateUser} >
        <div style={{ alignSelf: "center" }}>
        <label htmlFor="file-input">
        <Avatar style={{ backgroundImage: `url(${url})` }} />
        </label>
        <InputAvatar id="file-input" type="file" title="upload" onChange={Photo} />
        </div>
        <span style={{ textShadow: "none", color: "#fff" }} >
            Name: 
            <label>
            <StyledInput
             type="text"
             value={name}
             onChange={setName}
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
                 value={dob}
                 onChange={setDob}
                 renderInput={(props) => <StyledInput {...props} />}
            />
          </LocalizationProvider>
            </DobContainer>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Workplace: 
            <label>
            <StyledInput
              type="text"
              value={workplace}
              onChange={setWorkplace}
            />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Favorite:
            <label>
            <StyledInput
              type="text"
              value={favorite}
              onChange={setFavorite}
            />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            About:
            <label>
            <StyledInput
              type="text"
              value={about}
              onChange={setAbout}
            />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Beverage:
            <label>
            <StyledInput
              type="text"
              value={beverage}
              onChange={setBeverage}
            />
          </label>
          </span>
          <br/>
            <SaveBtnStyle type="submit" variant="contained">
            Save 
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