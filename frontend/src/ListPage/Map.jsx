import React from 'react';
import { Button, Header, Modal, List } from 'semantic-ui-react';
import { getConversations, sendMessage } from '../api/messages';
import { Link } from 'react-router-dom';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
} from 'react-google-maps';

import styles from './GoogleMapStyles.json';

const Map = ({
  googleMapURL = process.env.REACT_APP_GOOGLE_MAP_URI,
  latitude,
  longitude,
  list,
  radius,
  url,
}) => {
  const CMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={14}
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
    )),
  );

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
      {list.list.map((profile) => (
        <div>
          <Modal
            style={{
              textAlign: 'center',
              height: 'auto',
            }}
            dimmer="blurring"
            size="mini"
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
                    (new Date() - new Date(profile.DoB))
                      / (24 * 3600 * 365.25 * 1000),
                  )}`}
                </Header>
                <div
                  className="avatar cursor"
                  style={{
                    backgroundImage: `url(${profile.url
                      || ''})`,
                  }}
                />
                <List style={{ padding: '0 3rem', fontSize: 'large' }}>
                  <List.Item icon="briefcase" content={profile.workplace} />
                  <List.Item icon="glass martini" content={profile.beverage} />
                  <List.Item icon="comments" content={profile.favorite} />
                  <List.Item icon="info circle" content={profile.about} />
                </List>
 
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions
              style={{ backgroundColor: '#0f4667', textAlign: 'center' }}
            >
              <Link
                onClick={() => sendMessage(profile._id)}
                to={{
                  pathname: '/chat',
                  state: {
                    chats: getConversations(profile.person),
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
  </>
  );
};

export default Map;
