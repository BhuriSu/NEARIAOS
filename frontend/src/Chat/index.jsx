import React from 'react';
import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import {ChatContainer} from './ChatElement';

const Chat = ({name,UploadPhoto}) => {
    return (
        <ChatContainer>
        <SendbirdApp
            appId={process.env.APP_ID}
            userId={process.env.USER_ID}
            nickname={name}
            profileUrl={UploadPhoto}
            allowProfileEdit={true}
        />
        </ChatContainer>
    );
};
export default Chat;