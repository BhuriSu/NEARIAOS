import React from 'react';
import { Button, Header, Modal, List, Image } from 'semantic-ui-react';
import {
  GoogleMap,
  Marker,
  Circle,
} from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import styles from './GoogleMapStyles.json';
import {getMessages} from '../api/messages';
const Map = ({
  googleMapURL = import.meta.env.VITE_GOOGLE_MAP_URI,
  latitude,
  longitude,
  list,
  radius,
  props
}) => {
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
      {list.list.map((user) => (
        <div key={user.id}>
          <Modal
            style={{
              textAlign: 'center',
              height: 'auto',
            }}
            dimmer="blurring"
            size="mini"
            trigger={(
              <Marker
                position={{ lat: user.latitude, lng: user.longitude }}
                title={user.name}
              />
            )}
          >
            <Modal.Content>
              <Modal.Description>
                <Header style={{ color: '#0f4667', fontSize: 'x-large' }}>
                  {` ${user}, ${Math.floor(
                    (new Date() - new Date(user))
                      / (24 * 3600 * 365.25 * 1000),
                  )}`}
                </Header>
                <Image  
              className="mini"
              src={user.profilePicture}
              alt={user.username}  
              height={45} 
              width={45} 
              />
                <List style={{ padding: '0 3rem', fontSize: 'large' }}>
                  <List.Item icon="briefcase" content={user.workplace} />
                  <List.Item icon="glass martini" content={user.beverage} />
                  <List.Item icon="comments" content={user.favorite} />
                  <List.Item icon="info circle" content={user.about} />
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
                chats: getMessages(user, props.conversation._id),
                name: user.username,
              },
            }} >
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
