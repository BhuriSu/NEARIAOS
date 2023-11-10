import React, { useState, useEffect } from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <img src={user.photo} alt="User Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      <div>Username: {user.username}</div>
      <div>Date of Birth: {user.dob}</div>
      <div>Beverage: {user.beverage}</div>
      <div>Workplace: {user.workplace}</div>
      <div>Favorite: {user.favorite}</div>
      <div>About: {user.about}</div>
    </div>
  );
};

const CustomizedChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, ] = useState({
    photo: './images/DefaultAvatar.png', // You can set a default avatar image
    username: 'JohnDoe',
    dob: '1990-01-01',
    beverage: 'Coffee',
    workplace: 'Company XYZ',
    favorite: 'Movies',
    about: 'Hello, I am John Doe!',
  });

  // Simulate a simple conversation
  useEffect(() => {
    setMessages([
      { id: 1, text: 'Hello there!' },
      { id: 2, text: 'How are you?' },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessages = [...messages, { id: messages.length + 1, text: newMessage }];
    setMessages(newMessages);
    setNewMessage('');
  };

  return (
    <div>
      <UserProfile user={currentUser} />

      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll' }}>
        {messages.map((message) => (
          <div key={message.id}>{message.text}</div>
        ))}
      </div>

      <div>
        <input type="text" value={newMessage} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default CustomizedChat;