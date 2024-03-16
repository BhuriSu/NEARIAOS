import React, { useState } from 'react';
import axios from 'axios';
import { getDownloadURL, getStorage } from 'firebase/storage';
import { ref } from 'firebase/database';
import Map from './Map';
import ModalWindow from '../NewFeedComponents/Modal';
import './listUsers.css';
import { ListPageBackground, ToggleBox, InputFormUserList, LabelRadius } from './ListPageElement';
import { Button } from '@mui/material';

/**
 * @param {*} props
 */

function ListUsers() {
  const btnStyle = { backgroundColor: '#00eeff',color:'#000' };
  const [radius, setRadius] = useState('');
  const [list, setList] = useState({
    success: false,
    err: '',
  });
  const [isShowMap, setShowMap] = useState(false);
  const [url] = useState('');
  
  const ChangeOnMap = () => {
    setShowMap(!isShowMap);
  };
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  /**
   * @param {String} userId
   * @param {Number} latitude
   * @param {Number} longitude
   * @param {Number} radius
   */

  const requestListUsers = async (userId, latitude, longitude, radius) => {
    try {
      const response = await axios.post(`http://localhost:5000/lists/${userId}`, {
        latitude,
        longitude,
        radius,
      });
  
      if (response.data.success) {
        const result = await Promise.all(
          response.data.list.map(async (currentUser) => {
            const storage = getStorage();
            const pic = await getDownloadURL(ref(storage, `images/${currentUser._id}`));
            currentUser.userId = pic;
            return currentUser;
          })
        );
  
        setList({
          success: true,
          list: result,
        });
  
      } else {
        setList({
          success: false,
          err: response.data.err,
        });
      }
    } catch (error) {
      setList({
        success: false,
        err: error.message || 'Runtime error',
      });
    }
  };

  const geoFindLocation = () => {
    const success = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

      requestListUsers(
        position.coords.latitude,
        position.coords.longitude,
        radius || 200,
      );
    };

    const error = () => {
      setList({
        success: false,
        err: 'Unable to retrieve your location',
      });
    };

    if (!navigator.geolocation) {
      setList({
        success: false,
        err: 'Geolocation is not supported by your browser',
      });
    } else {
      /**
       * @param {function} success
       * @param {function} error
       */

      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return (
    <ListPageBackground>
         <InputFormUserList>
          <input
            title='radius'
            className='inputFind'
            onChange={(event) => {
              setRadius(event.target.value);
            }}
            type='range'
            style={{
              minWidth: '300px',
              display: 'block',
              width: '30%',
              height: '50px',
              margin: '0 auto',
              border: 'none',
              paddingBottom: '0',
              borderBottom: 'solid #FFF 2px',
              borderRadius: '0',
              boxShadow: 'none',
              marginBottom: '20px',
            }}
            min='200'
            max='10000'
            step='200'
            value={radius}
          />
          <LabelRadius>
            {radius !== null ? (
              <div>
                 Touch the line and move right or left
                 <br/>
                 <br/>
                {' '}
                Chosen radius: &nbsp;
                {' '}
                {radius}
                &nbsp; meters
                {' '}
              </div>
            ) : (
              <div style={{ margin: 'auto 0' }}>Choose the radius</div>
            )}
            &nbsp;
          </LabelRadius>
          <Button  
            variant='contained' 
            id='find-me'
            onClick={() => geoFindLocation()}
            style={btnStyle}
          >
            FIND SOMEONE
          </Button>

          {list.success ? (
          <ToggleBox>
            <input type='checkbox' user='toggle' className='sw' id='toggle-2' />
            <label htmlFor='toggle-2' onClick={ChangeOnMap}>
              <span>Use a map</span>
            </label>
          </ToggleBox>
          ) : (
           list.err
          )}
       
          <div>
            {isShowMap ? (
              <Map
                latitude={latitude}
                longitude={longitude}
                list={list}
                style={{
                  marginTop: '10%',
                  alignSelf: 'center',
                  width: '100%',
                  justifyContent: 'center',
                }}
                radius={radius}
              />
            ) : (
              <ul
                style={{
                  display: 'flex',
                  listStyle: 'none',
                  padding: '0',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                }}
              >
                {list.success
                  ? list.list?.map((currentUser) => (
                    <div className='map'>
                      <ModalWindow username={currentUser} url={url} />
                    </div>
                  ))
                  : list.err}
              </ul>
            )}
          </div>
      
        </InputFormUserList>

    </ListPageBackground>
  );
}

export default ListUsers;
