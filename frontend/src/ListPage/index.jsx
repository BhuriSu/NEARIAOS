import React, { useState } from 'react';
import axios from 'axios';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import Map from './Map';
import {
  ListPageBackground,
  ToggleBox,
  InputFormUserList,
  LabelRadius,
} from './ListPageElement';
import { Button } from '@mui/material';

function ListUsers() {
  const [radius, setRadius] = useState('');
  const [list, setList] = useState({
    success: false,
    err: '',
    list: [],
  });
  const [isShowMap, setShowMap] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const requestListUsers = async (latitude, longitude, radius) => {
    try {
      const response = await axios.post('/api/lists', {
        latitude,
        longitude,
        radius,
      });
      if (response.data.success) {
        const { list } = response.data;
        const promisesArr = list.map(async (user) => {
          try {
            const pic = await getDownloadURL(ref(getStorage(), `images/${user.username}`));
            user.url = pic;
            return user;
          } catch (error) {
            console.error('Error fetching profile picture:', error);
            return user;
          }
        });

        const result = await Promise.all(promisesArr);
        setList({
          success: true,
          list: result,
        });
      } else {
        setList({
          success: false,
          err: response.data.err,
          list: [],
        });
      }
    } catch (error) {
      console.error('Runtime error:', error);
      setList({
        success: false,
        err: 'Runtime error',
        list: [],
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
        list: [],
      });
    };

    if (!navigator.geolocation) {
      setList({
        success: false,
        err: 'Geolocation is not supported by your browser',
        list: [],
      });
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  const toggleMap = () => {
    setShowMap(!isShowMap);
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
              <br />
              <br />
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
          onClick={geoFindLocation}
          style={{ backgroundColor: '#00eeff', color: '#000' }}
        >
          FIND SOMEONE
        </Button>

        {list.success && (
          <ToggleBox>
            <input type='checkbox' user='toggle' className='sw' id='toggle-2' />
            <label htmlFor='toggle-2' onClick={toggleMap}>
              <span>Use a map</span>
            </label>
          </ToggleBox>
        )}

        <div>
          {isShowMap ? (
            <Map
              latitude={latitude}
              longitude={longitude}
              list={list}
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
                gap: '20px',
              }}
            >
              {list.success
                ? list.list.map((user) => (
                    <li
                      key={user._id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        width: '150px',
                        height: '200px',
                        boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                      }}
                    >
                      <img
                        src={user.url}
                        alt={user.username}
                        style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '50%',
                        }}
                      />
                      <p style={{ marginTop: '10px', fontSize: '16px' }}>
                        Age: {user.age}
                      </p>
                    </li>
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
