import React from 'react';
import SendbirdApp from "@sendbird/uikit-react/App";

const Chat = ({name,UploadPhoto}) => {
    return (
        <div className="Chat">
        <SendbirdApp
            appId={process.env.APP_ID}
            userId={process.env.USER_ID}
            nickname={name}
            profileUrl={UploadPhoto}
            allowProfileEdit={true}
        />
        </div>
    );
};
export default Chat;