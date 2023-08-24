
import "@sendbird/uikit-react/dist/index.css";
import './ChatElements.css';
import React from 'react';
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import CustomizedChat from './CustomizedChat';

const Chat = ({username,AvatarUser}) => {

    return (
        <div className="Chat">
        <SendbirdProvider
          appId={import.meta.env.APP_ID}
          userId={import.meta.env.USER_ID}
          nickname={username}
          profileUrl={AvatarUser}
          allowProfileEdit={true}
        >
        <CustomizedChat/>
        </SendbirdProvider>
        </div>
    );
};
export default Chat;