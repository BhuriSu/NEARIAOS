import React from 'react';
import {
  Button, Header, Modal, List,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { GoogleMap, Marker, Circle, LoadScript } from '@react-google-maps/api';
import styles from './GoogleMapStyles.json';
import { useSelector } from "react-redux";
import { getConversations, sendMessage } from '../api/messages';

const Map = ({
  googleMapURL = import.meta.env.VITE_GOOGLE_MAP_URI,
  latitude,
  longitude,
  list,
  radius,
 }) => {
  const CMap = (currentUser) => {
    return (
      <LoadScript googleMapsApiKey={googleMapURL}>
      <GoogleMap
        zoom={14}
        center={{ lat: latitude, lng: longitude }}
        options={{
          disableDefaultUI: true,
          draggable: true,
          keyboardShortcuts: false,
          scaleControl: true,
          scrollwheel: true,
          styles,
        }}
      >
        {currentUser.children}
      </GoogleMap>
      </LoadScript>
    );
  }
  const conversations = useSelector((state) => state.conversations);
  const sender = useSelector((state) => state.sender);
  return (
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
      {list.list.map((currentUser) => (
        <div key={currentUser._id} >
          <Modal
            style={{
              textAlign: 'center',
              height: 'auto',
            }}
            dimmer='blurring'
            size='mini'
            trigger={(
              <Marker
                position={{ lat: currentUser.latitude, lng: currentUser.longitude }}
                title={currentUser.username}
              />
              )}
          >
            <Modal.Content>
              <Modal.Description>
                <Header style={{ color: '#0f4667', fontSize: 'x-large' }}>
                  {` ${currentUser.username}, ${Math.floor(
                    (new Date() - new Date(currentUser.date))
                        / (24 * 3600 * 365.25 * 1000),
                  )}`}
                </Header>
                <div
                  className='avatar cursor'
                  style={{
                    backgroundImage: currentUser.profilePicture,
                  }}
                />
                <List style={{ padding: '0 3rem', fontSize: 'large' }}>
                  <List.Item icon='briefcase' content={currentUser.workplace} />
                  <List.Item icon='glass martini' content={currentUser.beverage} />
                  <List.Item icon='comments' content={currentUser.favorite} />
                  <List.Item icon='info circle' content={currentUser.about} />
                </List>

              </Modal.Description>
            </Modal.Content>
            <Modal.Actions
              style={{ backgroundColor: '#0f4667', textAlign: 'center' }}
            >
              <Link
                onClick={() => sendMessage(currentUser._id)}
                to={{
                  pathname: '/chat',
                  state: { 
                    chats: getConversations(conversations, sender._id),
                    name: currentUser.username,
                  },
                }}
              >
                <Button
                  primary
                  style={{
                    color: '#0f4667',
                    textShadow: 'none',
                    margin: '0 auto',
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
  );
}

export default Map;
