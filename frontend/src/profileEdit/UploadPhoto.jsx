import React, { useState } from 'react';
import {
  ref, uploadBytesResumable, getDownloadURL
} from 'firebase/storage';
import {storage} from '../Firebase/firebase';
import styled from 'styled-components';

const Avatar = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
background-size: cover;
background-position: center;
cursor: pointer;
`;

function Photo() {
  const [url, setUrl] = useState('./images/UploadPic.png');
  const [formData, setFormData] = useState({
    image: "",
  })

  const handleChange = (e) => {
      const storageRef = ref(storage, `/images/${formData.image.name}`);
      const uploadImage = uploadBytesResumable(storageRef, formData.image);
      uploadImage.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
    }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          console.log('storage is unauthorized');
          break;
        case 'storage/canceled':
          console.log('storage is canceled');
          break;
        case 'storage/unknown':
          console.log('storage is unknown');
          break;
        default:
          console.log('sorry it is not about storage');
      }
    },
        () => {
          setFormData({ ...formData, image: e.target.files[0] });
          getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            setUrl(url)
          });
        },
      );
    };

  return (
    <div style={{ alignSelf: 'center' }}>
      <label htmlFor='file-input'>
        <Avatar style={{ backgroundImage: `url(${url})` }} />
        </label>
        <input id='file-input' type='file' title='upload' onChange={handleChange} />
    </div>
  );
}
export default Photo;
