import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
   SaveBtnStyle, BelowDelete, Avatar, InputAvatar } from "./profileEditsElements";
import { Button } from "@mui/material";

//date of birth 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function ProfileEdit() {
  const BtnStyle = { marginTop: 5,backgroundColor: "#ff0000",color:"#000" };
  const navigate = useNavigate();
  const [url, setUrl] = useState("./images/UploadPic.png");

  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [beverage, setBeverage] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [favorite, setFavorite] = useState('');
  const [about, setAbout] = useState('');

  const {id} = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateData();
      } else {
        await createData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createData = async () => {
    const data = {
      username,
      dob,
      beverage,
      workplace,
      favorite,
      about
    };
    axios
      .post('http://localhost:5432/profiles', data)
      .then(() => {
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">Profile Edited successfully</Alert>
        </Stack>
        navigate('/profile');
      })
      .catch((error) => {
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">Username and date of birth require!</Alert>
        </Stack>
        console.log(error);
      });
  };

  useEffect(() => {
    axios
    .get(`http://localhost:5432/profiles/${id}`)
    .then((response) => {
      setUsername(response.data.username);
      setDob(response.data.dob);
      setBeverage(response.data.beverage);
      setWorkplace(response.data.workplace); 
      setFavorite(response.data.favorite); 
      setAbout(response.data.about); 
      }).catch((error) => {
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">Username and date of birth require!</Alert>
        </Stack>
        console.log(error);
      });
  }, [])

  const updateData = async () => {
    const data = {
      username,
      dob,
      beverage,
      workplace,
      favorite,
      about
    };
    axios
      .patch(`http://localhost:5432/profiles/${id}`, data)
      .then(() => {
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">Profile Edited successfully</Alert>
        </Stack>
        navigate('/profile');
      })
      .catch((error) => {
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">Username and date of birth require!</Alert>
        </Stack>
        console.log(error);
      });
  };

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
        <FormEditProfile >

        <div style={{ alignSelf: "center" }}>
        <label htmlFor="file-input">
        <Avatar style={{ backgroundImage: `url(${url})` }} />
        </label>
        <InputAvatar id="file-input" type="file" title="upload" onChange={Photo} />
        </div>

          <span style={{ textShadow: "none", color: "#fff" }} >
            Username: 
            <label>
            <StyledInput type="text" name="username" value={username || ''} onChange={(e) => setUsername(e.target.value)} />
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
            <StyledInput type="text" name="beverage" value={beverage || ''} onChange={(e) => setBeverage(e.target.value)} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Workplace: 
            <label>
            <StyledInput type="text" name="workplace" value={workplace || ''} onChange={(e) => setWorkplace(e.target.value)} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            Favorite:
            <label>
            <StyledInput type="text" name="favorite" value={favorite || ''} onChange={(e) => setFavorite(e.target.value)} />
          </label>
          </span>
          <br/>
          <span style={{ textShadow: "none", color: "#fff" }} >
            About:
            <label>
            <StyledInput type="text" name="about" value={about || ''} onChange={(e) => setAbout(e.target.value)} />
          </label>
          </span>
          <br/>
            <SaveBtnStyle type="submit" variant="contained" onClick={onSubmit}>
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