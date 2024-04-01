import React from 'react';
import { Button, Header, Modal, List } from 'semantic-ui-react';
import {
  GoogleMap,
  Marker,
  Circle,
} from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import styles from './GoogleMapStyles.json';
import {getMessages} from '../api/messages';
import UserAvatar from "../Chat/UserAvatar";

const Map = ({
  googleMapURL = import.meta.env.VITE_GOOGLE_MAP_URI,
  latitude,
  longitude,
  list,
  radius,
  profilePicture,
  date,
  workplace,
  beverage,
  favorite,
  about
}) => {
  const age = Math.floor(
    (new Date() - new Date(date)) / (24 * 3600 * 365.25 * 1000),
  );
  const CMap = 
    ((props) => (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultOptions={{
          disableDefaultUI: true,
          draggable: true,
          keyboardShortcuts: false,
          scaleControl: true,
          scrollwheel: true,
          styles,
        }}
      >
        {props.children}
      </GoogleMap>
    ))
  return (
    <>
    <CMap
      googleMapURL={googleMapURL}
      loadingElement={<div style={{ height: '50%' }} />}
      containerElement={<div style={{ height: '400px' }} />}
      mapElement={(
        <div
          style={{
            height: '95%',
            width: '85%',
            border: '2px solid #FFF',
            borderRadius: '25px',
            margin: '0 auto',
            boxShadow: '10px 10px 8px black',
          }}
        />
      )}
      center={{ lat: latitude, lng: longitude }}
    >
      <Circle center={{ lat: latitude, lng: longitude }} radius={+radius} />
      {list.list.map((username) => (
        <div key={username.id}>
          <Modal
            style={{
              textAlign: 'center',
              height: 'auto',
            }}
            dimmer="blurring"
            size="mini"
            trigger={(
              <Marker
                position={{ lat: username.latitude, lng: username.longitude }}
                title={username}
              />
            )}
          >
            <Modal.Content>
              <Modal.Description>
                <Header style={{ color: '#0f4667', fontSize: 'x-large' }}>
                {` ${username}, ${age}`}
                </Header>
              <UserAvatar  
              username={username}
              height={45} 
              width={45} 
              />
                <List style={{ padding: '0 3rem', fontSize: 'large' }}>
                  <List.Item icon="briefcase" content={workplace} />
                  <List.Item icon="glass martini" content={beverage} />
                  <List.Item icon="comments" content={favorite} />
                  <List.Item icon="info circle" content={about} />
                </List>
 
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions
              style={{ backgroundColor: '#0f4667', textAlign: 'center' }}
            >
          <Link
          to={{
          pathname: '/chat', 
          state: {
             chats: getMessages(),
             name: username,
             url: profilePicture, 
             friend: workplace, 
             urlFriend: '', 
               },
             }}
          >
            <Button
              style={{
                color: 'rgb(124, 42, 255)',
                textShadow: 'none',
                marginBottom: '1em',
                borderRadius: '320px',
                backgroundColor: '#FFF',
              }}
            >
              Chat
            </Button>
          </Link>
            </Modal.Actions>
          </Modal>
        </div>
      ))}
    </CMap>
  </>
  );
};

export default Map;
