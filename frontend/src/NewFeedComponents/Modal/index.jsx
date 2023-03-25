import React from 'react';
import {
  Button, Header, Modal, List, Card
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Mini, AvatarModal } from './ModalElements';

function ModalWindow(props) {
  const { url } = props;
  const profile = props.obj;
  const age = Math.floor(
    (new Date() - new Date(profile.dob)) / (24 * 3600 * 365.25 * 1000),
  );

  return (
    <div>
      <Modal
        style={{
          textAlign: 'center',
          height: 'auto',
        }}
        dimmer='blurring'
        size='mini'
        trigger={(
          <Button
            style={{
              fontSize: '25px',
              listStyle: 'none',
              alignSelf: 'center',
              position: 'relative',
              backgroundColor: 'transparent',
              flex: '1',
              color: '#FFF',
            }}
          >
            <Card
              style={{
                backgroundColor: 'transparent',
                borderRadius: '8px',
                width: '200px',
              }}
            >
              <Card.Content>
                <Mini
                  style={{
                    backgroundImage: `url(${profile.url || './images/infoUser.svg'})`,
                  }}
                />
                <Card.Header textAlign='center' />
                <Card.Description style={{ color: 'white' }}>
                  {profile.name}
                  ,
                  {age}
                </Card.Description>
              </Card.Content>
            </Card>
          </Button>
        )}
      >
        <Modal.Content>
          <Modal.Description style={{ color: 'rgb(124, 42, 255)' }}>
            <Header style={{ color: 'rgb(124, 42, 255)', fontSize: 'x-large' }}>
              {` ${profile.name}, ${age}`}
            </Header>
            <AvatarModal
              className='cursor'
              style={{
                backgroundImage: `url(${profile.url || './images/infoUser.svg'})`,
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
          style={{ backgroundColor: 'rgb(124, 42, 255)', textAlign: 'center' }}
        >
          <Link  to={{
              pathname: '/chat',
              state: {
                name: profile.name,
                url,
                friend: profile.person,
                urlFriend: profile.url,
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
              Write
            </Button>
          </Link>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalWindow;
