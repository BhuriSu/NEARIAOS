import React, { useState } from "react";
import { Avatar, InputAvatar } from './profileEditsElements';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebase";

const AvatarUser = async () => {

    const [url, setUrl] = useState("./images/UploadPic.png");

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
    
  return (
        <div style={{ alignSelf: "center" }}>
        <label htmlFor="file-input">
        <Avatar style={{ backgroundImage: `url(${url})` }} />
        </label>
        <InputAvatar id="file-input" type="file" title="upload" onChange={Photo} />
        </div>
  );
}

export default AvatarUser;
