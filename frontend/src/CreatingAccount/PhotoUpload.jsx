import React, { useState } from "react";
import { useCookies } from "react-cookie";
import {
  ref, uploadBytesResumable, getDownloadURL, getStorage,
} from "firebase/storage";
import styled from "styled-components";

const Avatar = styled.div`
width: 250px;
height: 250px;
border-radius: 50%;
background-size: cover;
background-position: center;
cursor: pointer;
`;

function Photo() {
  const [cookies] = useCookies(["userName"]);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("./images/UploadPic.svg");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const storage = getStorage();
      const storageRef = ref(storage, `images/${cookies.userName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        () => {
          setUrl("./loading.gif");
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
          // complete function ....

          getDownloadURL(storageRef).then((url) => {
            setUrl(url);
          });
        },
      );
    }
  };

  return (
    <div style={{ alignSelf: "center" }}>
      <label htmlFor="file-input">
        <Avatar style={{ backgroundImage: `url(${url})` }} />
      </label>
      <input id="file-input" type="file" onChange={handleChange} />
    </div>
  );
}

export default Photo;
