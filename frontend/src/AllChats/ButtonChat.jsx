import React from 'react';
import { Link } from 'react-router-dom';
import { MsgButton, Avatar } from './ButtonChatElements';

function ButtonChat(props) {
  const { url, chats } = props;

  return (
    <MsgButton>
      <Link
        to={{
          pathname: '/chat',
          state: {
            chats: chats.chat,
          },
        }}
        style={{ display: ' flex', outline: 'none' }}
        className="btnLink"
      >
        <Avatar
          style={{
            backgroundImage: `url(${url})`,
            width: '100px',
            height: '100px',
            float: 'left',
          }}
        />
        <div
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            marginLeft: '5%',
          }}
        >
          <div
            style={{
              padding: '15px 0 0 0',
              float: 'left',
              width: '220px',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '27px',
              marginBottom: '5px',
            }}
          >
            <strong>
              {chats.nickname}
              :
            </strong>
          
            {chats.lastMessage}
          </div>
          <div
            style={{
              fontWeight: '400',
              color: '#aab8c2',
              fontSize: '13px',
            }}
          />
        </div>
      </Link>
    </MsgButton>
  );
}

export default ButtonChat;
