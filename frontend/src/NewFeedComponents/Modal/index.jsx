import React from 'react';
import {
  Button, Header, Modal, List, Card
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Mini, AvatarModal } from './ModalElements';
import { useSelector } from "react-redux";
import { getConversations } from '../../api/messages';
function ModalWindow() {
  const conversations = useSelector((state) => state.conversations);
  const sender = useSelector((state) => state.sender);
  const currentUser  = useSelector((state) => state.user);
  const age = Math.floor(
    (new Date() - new Date(currentUser.date)) / (24 * 3600 * 365.25 * 1000),
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
                    backgroundImage: currentUser.profilePicture,
                  }}
                />
                <Card.Header textAlign='center' />
                <Card.Description style={{ color: 'white' }}>
                  {currentUser.username}
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
              {` ${currentUser.username}, ${age}`}
            </Header>
            <AvatarModal
              className='cursor'
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
          style={{ backgroundColor: 'rgb(124, 42, 255)', textAlign: 'center' }}
        >
          <Link  to={{
              pathname: '/chat',
              state: {
                chats: getConversations(conversations, sender._id),
                name: currentUser.username,
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
  );
}

export default ModalWindow;
