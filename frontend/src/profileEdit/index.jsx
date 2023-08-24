import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import AvatarUser from "./avatar";
//firebase
import { getAuth, deleteUser, signOut } from "firebase/auth";
import {
  ref, deleteObject
} from "firebase/storage";
import { storage } from "../Firebase/firebase";

// css 
import { BackgroundProfileContainer, BackToListPage, DobContainer,
   LogOutLine, FormEditProfile, StyledInput,
   SaveBtnStyle, BelowDelete } from "./profileEditsElements";
import { Button } from "@mui/material";

//date of birth 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ProfileEdit() {
  const BtnStyle = { marginTop: 5,backgroundColor: "#ff0000",color:"#000" };
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.id) {
      // If form data contains an ID, update the document in MongoDB
      updateData(data);
    } else {
      // If form data doesn't contain an ID, create a new document in MongoDB
      createData(data);
    }
  };

  const createData = (data) => {
    axios.post(`/users/profiles`, data).then(() => {
      navigate("/profile");
    }).catch((error) => {
      console.log("Error creating data:", error);
    });
  };

  const updateData = (data) => {
    axios.patch(`/users/profiles/${data.id}`, data).then((response) => {
      console.log("Data updated:", response.data);
    }).catch((error) => {
      console.log("Error updating data:", error);
    });
  };
  
 
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
        <FormEditProfile onSubmit={handleSubmit(onSubmit)} >

          <AvatarUser/>

          <span style={{ textShadow: "none", color: "#fff" }} >
            Username: 
            <label>
            <StyledInput
            type="text"
            {...register("username", { required: true, pattern: /^[A-Za-z]+$/i })}
            />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Date of birth: 
           <DobContainer>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker />
           </LocalizationProvider>
           </DobContainer>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Beverage:
            <label>
            <StyledInput
              type="text"
              {...register("beverage")}
            />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Workplace: 
            <label>
            <StyledInput
              type="text"
              {...register("workplace")}
            />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Favorite:
            <label>
            <StyledInput
              type="text"
              {...register("favorite")}
            />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            About:
            <label>
            <StyledInput
              type="text"
              {...register("about")}
            />
          </label>
          </span>
          <br/>
            <SaveBtnStyle type="submit" variant="contained">
            save
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