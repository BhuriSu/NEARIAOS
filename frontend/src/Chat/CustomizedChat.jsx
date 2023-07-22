import React, {useState} from 'react'; 
import { ChannelList, Channel, ChannelSettings } from '@sendbird/uikit-react/';

const CustomizedChat = () => {
    const [currentChannel, setCurrentChannel] = useState(null);
    const currentChannelUrl = currentChannel ? currentChannel.url : "";
    const [showSettings, setShowSettings] = useState(false);
    let channelChatDiv = document.getElementsByClassName("channel-chat")[0];
    const renderSettingsBar = () => {
        channelChatDiv.style.width = "52%";
        channelChatDiv.style.cssFloat = "left";
    }
    const hideSettingsBar = () => {
        channelChatDiv.style.width = "76%";
        channelChatDiv.style.cssFloat = "right";
    }
    return (
        <div className="channel-wrap">
            <div className="channel-list">
                <ChannelList
                onChannelSelect={(channel)=>{
                setCurrentChannel(channel);
                }}    
                />
            </div>
            <div className="channel-chat">
                <Channel
                 channelUrl={currentChannelUrl}
                 onChatHeaderChannelClick={()=>{
                    setShowSettings(!showSettings);
                    renderSettingsBar();
                    }}   
                />
            </div>
            {showSettings && (
                <div className="channel-settings">
                <ChannelSettings
                channelUrl={currentChannelUrl}
                onCloseClick = {() =>{
                    setShowSettings(false);
                    hideSettingsBar();
                }}
                />
                </div>
            )}
        </div>
    );
};
export default CustomizedChat;