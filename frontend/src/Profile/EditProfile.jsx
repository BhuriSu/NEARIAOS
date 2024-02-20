import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebase";
import {
  BackgroundProfileContainer,
  DateContainer,
  FormEditProfile,
  SaveBtnStyle,
  StyledInput,
  Avatar,
  InputAvatar,
  LogOutLine
} from "./profileElements";

function EditProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    date: "",
    beverage: "",
    workplace: "",
    favorite: "",
    about: "",
    image: null,
  });

  const [url, setUrl] = useState("./images/UploadPic.png");

  useEffect(() => {
    // Fetch user data by user ID from MongoDB
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profiles/${userId}`);
        const userData = response.data;

        setFormData({
          username: userData.username,
          date: userData.date,
          beverage: userData.beverage,
          workplace: userData.workplace,
          favorite: userData.favorite,
          about: userData.about,
          image: userData.imageUrl ? await fetchImage(userData.imageUrl) : null,
        });

        setUrl(userData.imageUrl || "./images/UploadPic.png");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Function to fetch image from Firebase storage
  const fetchImage = async (imageUrl) => {
    const storageRef = ref(storage, imageUrl);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Function to update photo in Firebase storage
  const updatePhoto = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    await uploadTask;

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    setUrl(downloadURL);

    return downloadURL;
  };

  // Function to update profile in MongoDB and Firebase
  const updateProfile = async () => {
    try {
      const imageUrl = formData.image ? await updatePhoto(formData.image) : null;

      // Update data in MongoDB
      const response = await axios.patch(`http://localhost:5000/profiles/${userId}`, {
        username: formData.username,
        date: formData.date,
        beverage: formData.beverage,
        workplace: formData.workplace,
        favorite: formData.favorite,
        about: formData.about,
        imageUrl,
      });

      if (response.status === 200) {
        alert("Profile updated successfully");
        navigate(`/profile/${userId}`);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Internal Server Error");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile();
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

  return (
    <BackgroundProfileContainer>
      <FormEditProfile onSubmit={handleSubmit}>
        <div style={{ alignSelf: "center" }}>
          <label htmlFor="image">
            <Avatar style={{ backgroundImage: `url(${formData.image ? URL.createObjectURL(formData.image) : url})` }} />
          </label>
          <InputAvatar type="file" id="image" title="upload" onChange={handleImageChange} />
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

        <SaveBtnStyle type="submit">Save</SaveBtnStyle>
      </FormEditProfile>
      
      <br/>
          <Link to="/profiles">
          <LogOutLine>
           Go back to profile page
          </LogOutLine>
          </Link>
      <br/>
    </BackgroundProfileContainer>
  );
}

export default EditProfile;
