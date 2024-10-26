import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListPageBackground, InputFormUserList, LabelRadius } from './ListPageElement';
import { Button } from '@mui/material';

function ListUsers() {
  const [radius, setRadius] = useState('');
 // const [isShowMap, setShowMap] = useState(false);
  const [showProfiles, setShowProfiles] = useState(false);

  const exampleUsers = [
    { id: 1, username: 'User1', age: 25, url: 'https://picsum.photos/100/100?random=1' },
    { id: 2, username: 'User2', age: 30, url: 'https://picsum.photos/100/100?random=2' },
    { id: 3, username: 'User3', age: 22, url: 'https://picsum.photos/100/100?random=3' },
    { id: 4, username: 'User4', age: 28, url: 'https://picsum.photos/100/100?random=4' },
    { id: 5, username: 'User5', age: 27, url: 'https://picsum.photos/100/100?random=5' },
  ];

  const navigate = useNavigate();

  const handleFindSomeone = () => {
    setShowProfiles(true);
  };

  const handleChatClick = () => {
    navigate('/chat'); // Navigate to the chat page
  };

  return (
    <ListPageBackground>
      <InputFormUserList>
        <input
          title='radius'
          className='inputFind'
          onChange={(event) => {
            setRadius(event.target.value);
          }}
          type='range'
          style={{
            minWidth: '300px',
            display: 'block',
            width: '30%',
            height: '50px',
            margin: '0 auto',
            border: 'none',
            paddingBottom: '0',
            borderBottom: 'solid #FFF 2px',
            borderRadius: '0',
            boxShadow: 'none',
            marginBottom: '20px',
          }}
          min='200'
          max='10000'
          step='200'
          value={radius}
        />
        <LabelRadius>
          {radius !== null ? (
            <div>
              Touch the line and move right or left
              <br />
              <br />
              Chosen radius: {radius} meters
            </div>
          ) : (
            <div style={{ margin: 'auto 0' }}>Choose the radius</div>
          )}
          &nbsp;
        </LabelRadius>
        <Button
          variant='contained'
          id='find-me'
          onClick={handleFindSomeone}
          style={{ backgroundColor: '#00eeff', color: '#000' }}
        >
          FIND SOMEONE
        </Button>

        <div style={{ marginTop: '30px' }}> {/* Added margin here for spacing */}
          {showProfiles && (
            <ul
              style={{
                display: 'flex',
                listStyle: 'none',
                padding: '0',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              {exampleUsers.map((user) => (
                <li
                  key={user.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ccc',
                    borderRadius: '15px',
                    width: '150px',
                    height: '200px',
                    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={user.url}
                    alt={user.username}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      marginBottom: '10px',
                    }}
                  />
                  <p style={{ margin: '0', fontSize: '16px' }}>Age: {user.age}</p>
                  <Button
                    variant='contained'
                    onClick={handleChatClick} // Call handleChatClick to navigate to /chat
                    style={{ marginTop: '10px', backgroundColor: '#00eeff', color: '#000' }}
                  >
                    Chat
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </InputFormUserList>
    </ListPageBackground>
  );
}

export default ListUsers;
