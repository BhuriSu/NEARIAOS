import React from 'react';
import { Button, Header, Modal, List } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
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
  props
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
  const { currentUser } = useSelector((state) => state.user) || {};
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
                <div
                  className="avatar cursor"
                  style={{
                    backgroundImage: `url(${user.url
                      || ''})`,
                  }}
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
               {currentUser && user._id !== currentUser.userId && (
            <Button variant="outlined" onClick={props.handleMessage}>
              Message
            </Button>
          )}
            </Modal.Actions>
          </Modal>
        </div>
      ))}
    </CMap>
  </>
  );
};

export default Map;
