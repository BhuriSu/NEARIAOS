import React from 'react';
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import "@sendbird/uikit-react/dist/index.css";
import './ChatElements.css';
import CustomizedChat from './CustomizedChat';

const Chat = ({username,Photo}) => {

    return (
        <div className="Chat">
        <SendbirdProvider
          appId={import.meta.env.APP_ID}
          userId={import.meta.env.USER_ID}
          nickname={username}
          profileUrl={Photo}
          allowProfileEdit={true}
        >
        <CustomizedChat/>
        </SendbirdProvider>
        </div>
    );
};
export default Chat;