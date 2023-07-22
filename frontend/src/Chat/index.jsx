import React from 'react';
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import "@sendbird/uikit-react/dist/index.css";
import CustomizedChat from './CustomizedChat';
import './ChatElements.css';

const Chat = ({name,UploadPhoto}) => {

    return (
        <div className="Chat">
        <SendbirdProvider
          appId={import.meta.env.APP_ID}
          userId={import.meta.env.USER_ID}
          nickname={name}
          profileUrl={UploadPhoto}
          allowProfileEdit={true}
        >
        <CustomizedChat/>
        </SendbirdProvider>
        </div>
    );
};
export default Chat;