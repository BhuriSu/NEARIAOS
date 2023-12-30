import React from 'react';
import {
  Button, Header, Modal, List,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { GoogleMap, Marker, Circle, LoadScript } from '@react-google-maps/api';
import styles from './GoogleMapStyles.json';

const Map = ({
  googleMapURL = import.meta.env.VITE_GOOGLE_MAP_URI,
  latitude,
  longitude,
  list,
  radius,
  url,
 }) => {
  
  const CMap = (formData) => {
   
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
        {formData.children}
      </GoogleMap>
      </LoadScript>
    );
  }

  return (
    <CMap
      googleMapURL={googleMapURL}
      loadingElement={<div style={{ height: '50%' }} />}
      center={{ lat: latitude, lng: longitude }}
    >
      <Circle center={{ lat: latitude, lng: longitude }} radius={+radius} />
      {list.list.map((profile) => (
        <div key={profile._id} >
          <Modal
            style={{
              textAlign: 'center',
              height: 'auto',
            }}
            dimmer='blurring'
            size='mini'
            trigger={(
              <Marker
                position={{ lat: profile.latitude, lng: profile.longitude }}
                title={profile.name}
              />
              )}
          >
            <Modal.Content>
              <Modal.Description>
                <Header style={{ color: '#0f4667', fontSize: 'x-large' }}>
                  {` ${profile.name}, ${Math.floor(
                    (new Date() - new Date(profile.date))
                        / (24 * 3600 * 365.25 * 1000),
                  )}`}
                </Header>
                <div
                  className='avatar cursor'
                  style={{
                    backgroundImage: `url(${profile.url
                        || './images/infoUser.svg'})`,
                  }}
                />
                <List style={{ padding: '0 3rem', fontSize: 'large' }}>
                  <List.Item icon='briefcase' content={profile.workplace} />
                  <List.Item icon='glass martini' content={profile.beverage} />
                  <List.Item icon='comments' content={profile.favorite} />
                  <List.Item icon='info circle' content={profile.about} />
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
                    name: profile.name,
                    url,
                    friend: profile.person,
                    urlFriend: profile.url,
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
