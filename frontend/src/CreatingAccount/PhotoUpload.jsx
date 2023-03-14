import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  ref, uploadBytesResumable, getDownloadURL, getStorage
} from 'firebase/storage';
import styled from 'styled-components';

const Avatar = styled.div`
width: 150px;
height: 150px;
border-radius: 50%;
background-size: cover;
background-position: center;
cursor: pointer;
`;

function Photo() {
  const [cookies] = useCookies(['user'])
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('./images/UploadPic.png');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const storage = getStorage();
      const storageRef = ref(storage, `images/${cookies.user}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        () => {
          setUrl('./loading.gif');
        },
        (error) => {
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
          getDownloadURL(uploadTask.ref).then((url) => {
            setUrl(url);
          });
        },
      );
    }
  };

  return (
    <div style={{ alignSelf: 'center' }}>
      <label htmlFor='file-input'>
        <Avatar style={{ backgroundImage: `url(${url})` }} />
        <input id='file-input' type='file' title='upload' onChange={handleChange} />
      </label>
    </div>
  );
}

export default Photo;
