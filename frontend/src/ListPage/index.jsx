import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import {  getDownloadURL, getStorage } from 'firebase/storage';
import { ref, getDatabase, child, onValue } from 'firebase/database';
import Map from './Map';
import ModalWindow from '../NewFeedComponents/Modal';
import './listUsers.css';
import { ListPageBackground, ToggleBox } from './ListPageElement';
import { Button } from '@mui/material';

/**
 * @param {*} props
 */

function ListUsers() {
  const btnStyle = { marginTop: 5,backgroundColor: '#00eeff',color:'#000' };
  const [cookies] = useCookies(['user']);
  const [radius, setRadius] = useState('');
  const [list, setList] = useState({
    success: false,
    err: '',
  });

  const [isShowMap, setShowMap] = useState(false);
  const [setUser] = useState('');
  const [url, setUrl] = useState('');
  const database = ref(getDatabase());
  const pushRoom = child(database, `${cookies.user}`);


  useEffect(() => {
    const handleNewMessages = async (snap) => {
      if (snap.val()) {
        Object.entries(snap.val()).forEach((el) => {
          const [, obj] = el;
          obj && setUser(obj);
        });
        pushRoom.remove();
      }
    };
    const unsubscribe = onValue(pushRoom, handleNewMessages);
    return () => unsubscribe();
  });

  const ChangeOnMap = () => {
    setShowMap(!isShowMap);
  };
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  /**
   * @param {String} id
   * @param {Number} latitude
   * @param {Number} longitude
   * @param {Number} radius
   */

  const requestListUsers = (id, latitude, longitude, radius) => {
    axios
      .post('/list/users', {
        id,
        latitude,
        longitude,
        radius,
      })
      .then(async (response) => {
        if (response.data.success) {

          const promisesArr = response.data.list.map(async (user) => {
            const storage = getStorage();
            const pic = await getDownloadURL(ref(storage, `images/${user.person}`))
              .catch((e) => console.log(e));
            user.url = pic;
            return user;
          });

          Promise.all(promisesArr).then((result) => {
            setList({
              success: true,
              list: result,
            });

            result.forEach((el) => {
              if (el.person === cookies.user) {
                setUrl(el.url);
              }
            });
          });
        } else {
          setList({
            success: false,
            err: response.data.err,
          });
        }
      })
      .catch(() => {
        setList({
          success: false,
          err: 'Runtime error',
        });
      });
  };

  const geoFindLocation = () => {
    const success = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

      requestListUsers(
        cookies.user,
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
         <div className='input-form-UserList'>
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
          <label className='label'>
            {radius !== null ? (
              <div>
                 Just touch the line and move right or left
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
          </label>
          <Button  
            variant='contained' 
            id='find-me'
            onClick={() => geoFindLocation()}
            style={btnStyle}
          >
            FIND ME SOMEONE
          </Button>

          {list.success ? (
          <ToggleBox>
            <input type='checkbox' name='toggle' className='sw' id='toggle-2' />
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
                  ? list.list?.map((obj) => (
                    <div key={obj._id} className='map'>
                      <ModalWindow obj={obj} url={url} />
                    </div>
                  ))
                  : list.err}
              </ul>
            )}
          </div>
      
        </div>

    </ListPageBackground>
  );
}

export default ListUsers;
