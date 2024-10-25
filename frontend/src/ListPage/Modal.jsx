import React from 'react';
import {
  Button, Header, Modal, List, Card 
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getMessages } from '../api/messages';
import UserAvatar from "../NewAccount/UserAvatar";

function ModalWindow(props) {

  return (
    <div>
      <Modal
        style={{
          textAlign: 'center',
          height: 'auto',
        }}
        dimmer="blurring"
        size="mini"
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
                border: 'solid 2px #f5505b',
                borderRadius: '8px',
                width: '200px',
              }}
            >
              <Card.Content>
              <UserAvatar  
              username={props.username}
              height={45} 
              width={45} 
              />
                <Card.Header textAlign="center"/>
                <Card.Description style={{ color: 'white' }}>
                  {props.username}
                  ,
                  {props.age}
                </Card.Description>
              </Card.Content>
            </Card>
          </Button>
        )}
      >
        <Modal.Content>
          <Modal.Description style={{ color: 'rgb(124, 42, 255)' }}>
            <Header style={{ color: 'rgb(124, 42, 255)', fontSize: 'x-large' }}>
              {` ${props.username}, ${props.age}`}
            </Header>
            <UserAvatar  
              username={props.username}
              height={45} 
              width={45} 
              />
            <List style={{ padding: '0 3rem', fontSize: 'large' }}>
            <List.Item icon="briefcase" content={props.workplace} />
            <List.Item icon="glass martini" content={props.beverage} />
            <List.Item icon="comments" content={props.favorite} />
            <List.Item icon="info circle" content={props.about} />
            </List>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions
          style={{ backgroundColor: 'rgb(124, 42, 255)', textAlign: 'center' }}
        >
      <Link
      to={{
         pathname: '/chat', 
         state: {
             chats: getMessages(),
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
  );
}

export default ModalWindow;