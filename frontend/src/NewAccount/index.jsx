import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebase } from "../Firebase";
import { getAuth, signOut } from "firebase/auth";

// Redux actions
import {
  createStart,
  createSuccess,
  createFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import UserAvatar from "./UserAvatar";

// CSS Components
import {
  BackgroundProfileContainer,
  StyledInput,
  DivImage,
  SaveBtnStyle,
  DeleteBtnStyle,
  LogOutLine,
} from "./NewAccountElements";
import { CircularProgressbar } from "react-circular-progressbar";
import { Alert } from "flowbite-react";

function NewAccountPage() {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    username: "",
    date: "",
    beverage: "",
    workplace: "",
    favorite: "",
    about: "",
    profilePicture: "",
  });
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [userSuccess, setUserSuccess] = useState(null);
  const [userError, setUserError] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) return; // Early return if no userId
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setFormData(data); // Set the form data
        setIsUpdateMode(true); // Set update mode
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setUserError("Failed to fetch user data.");
      }
    };

    fetchProfileData();
  }, [userId]); // Fetch data when userId changes

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
      setIsUpdateMode(true);
    }
  }, [location.state]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage(imageFile);
    }
  }, [imageFile]);

  const uploadImage = async (file) => {
    setImageFileUploadError(null);
    const storage = getStorage(firebase);
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(error.message);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData((prev) => ({ ...prev, profilePicture: downloadURL }));
        } catch (error) {
          setImageFileUploadError(error.message);
        }
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserError(null);
    setUserSuccess(null);

    if (!formData.username || !formData.date) {
      setUserError("Please fill in all required fields");
      return;
    }

    if (imageFileUploadProgress < 100) {
      setUserError("Please wait for the image to finish uploading");
      return;
    }

    try {
      dispatch(isUpdateMode ? updateStart() : createStart());
      const endpoint = isUpdateMode ? `/api/users/update/${userId}` : "/api/users/create";
      const method = isUpdateMode ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        const action = isUpdateMode ? updateFailure : createFailure;
        dispatch(action(data.message));
        setUserError(data.message);
      } else {
        const action = isUpdateMode ? updateSuccess : createSuccess;
        dispatch(action(data));
        setUserSuccess(isUpdateMode ? "User's profile updated successfully" : "User profile created successfully");

        if (!isUpdateMode) {
          navigate("/listUser", { state: { formData } });
        }
      }
    } catch (error) {
      setUserError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/users/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: formData.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
        setUserError(data.message);
      } else {
        dispatch(deleteSuccess());
        setUserSuccess("User profile deleted successfully");
        navigate("/");
      }
    } catch (error) {
      setUserError(error.message);
    }
  };

  const LogOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate("/"); // Redirect after logout
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BackgroundProfileContainer>
      <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "center" }}>
          <DivImage>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={filePickerRef}
              hidden
            />
            <div
              className="relative w-100 h-100 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
              onClick={() => filePickerRef.current.click()}
            >
              {imageFileUploadProgress && (
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root: { width: "100%", height: "100%", position: "absolute", top: 0, left: 0 },
                    path: { stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})` },
                  }}
                />
              )}
              <UserAvatar
                profilePicture={formData.profilePicture}  
                height={100} 
                width={100} 
                alt="user"
                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress < 100 && 'opacity-50'}`}
              />
            </div>
            {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}
          </DivImage>
        </div>

        <StyledInput  
          type="text"
          name="username"
          placeholder="username..."
          value={formData.username}
          onChange={handleChange} 
        />
        <br/>

        <div style={{ backgroundColor: "#9645ff", borderRadius: "20px", padding: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
          <input 
            type="date" 
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{ border: "none", background: "transparent", color: "#000", outline: "none", textAlign: "center" }}
          />
        </div>
        <br/>

        <StyledInput 
          type="text"
          name="beverage"
          placeholder="beverage..."
          value={formData.beverage}
          onChange={handleChange} 
        />
        <br/>
        <StyledInput 
          type="text"
          name="workplace"
          placeholder="workplace..."
          value={formData.workplace}
          onChange={handleChange} 
        />
        <br/>
        <StyledInput 
          type="text"
          name="favorite"
          placeholder="favorite..."
          value={formData.favorite}
          onChange={handleChange} 
        />
        <br/>
        <StyledInput 
          type="text"
          name="about"
          placeholder="about you..."
          value={formData.about}
          onChange={handleChange} 
        />
        <br/>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
          <SaveBtnStyle type="submit" style={{ marginRight: "10px" }}>
            {isUpdateMode ? "Update" : "Save"}
          </SaveBtnStyle>
          {isUpdateMode && (
            <DeleteBtnStyle onClick={handleDelete}>
              Delete
            </DeleteBtnStyle>
          )}
        </div>

        {userSuccess && <Alert color="success">{userSuccess}</Alert>}
        {userError && <Alert color="failure">{userError}</Alert>}
      </form>
      <br/>
      
      <Link
      style={{
    border: "none",
    background: "transparent",
    color: "#fff",
    outline: "none",
    textAlign: "center",
    fontSize: "26px", // Add your desired font size here
      }}
      to="/listUser"
       >
       Back to User List
      </Link>
      <LogOutLine onClick={LogOut}>
        Log Out
      </LogOutLine>
    </BackgroundProfileContainer>
  );
}

export default NewAccountPage;
