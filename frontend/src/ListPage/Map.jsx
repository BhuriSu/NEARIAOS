import React from "react";
import {
  Button, Header, Modal, List,
} from "semantic-ui-react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { GoogleMap, Marker, Circle, LoadScriptNext } from "@react-google-maps/api";
import styles from "./GoogleMapStyles.json";

function Map({
  googleMapURL = process.env.REACT_APP_GOOGLE_MAP_URI,
  latitude,
  longitude,
  list,
  radius,
  url,
 }) {
  const [cookies] = useCookies(["userName"]);

  function sendRequest(id) {
    axios.post("/database", {
      ID1: cookies.userName,
      ID2: id,
    });
  }

  function getChatName(a, b) {
    if (a > b) {
      return `${a}+${b}`;
    }
    return `${b}+${a}`;
  }

  function CMap(props) {
    return (
      <LoadScriptNext googleMapsApiKey={googleMapURL}>
      <GoogleMap
        zoom={14}
        center={{ lat: latitude, lng: longitude }}
        options={{
          disableDefaultUI: true,
          draggable: true,
          keyboardShortcuts: false,
          scaleControl: true,
          scrollwheel: true,
          styles,
        }}
      >
        {props.children}
      </GoogleMap>
      </LoadScriptNext>
    );
  }

  return (
    <CMap
      googleMapURL={googleMapURL}
      loadingElement={<div style={{ height: "50%" }} />}
      center={{ lat: latitude, lng: longitude }}
    >
      <Circle center={{ lat: latitude, lng: longitude }} radius={+radius} />
      {list.list.map((profile) => (
        <div key={profile._id} >
          <Modal
            style={{
              textAlign: "center",
              height: "auto",
            }}
            dimmer="blurring"
            size="mini"
            trigger={(
              <Marker
                icon={{ url: "./images/search.svg" }}
                position={{ lat: profile.latitude, lng: profile.longitude }}
                title={profile.name}
              />
              )}
          >
            <Modal.Content>
              <Modal.Description>
                <Header style={{ color: "#0f4667", fontSize: "x-large" }}>
                  {` ${profile.name}, ${Math.floor(
                    (new Date() - new Date(profile.DoB))
                        / (24 * 3600 * 365.25 * 1000),
                  )}`}
                </Header>
                <div
                  className="avatar cursor"
                  style={{
                    backgroundImage: `url(${profile.url
                        || "./images/infoUser.svg"})`,
                  }}
                />
                <List style={{ padding: "0 3rem", fontSize: "large" }}>
                  <List.Item icon="briefcase" content={profile.activity} />
                  <List.Item icon="glass martini" content={profile.drinks} />
                  <List.Item icon="comments" content={profile.topics} />
                  <List.Item icon="info circle" content={profile.about} />
                </List>

              </Modal.Description>
            </Modal.Content>
            <Modal.Actions
              style={{ backgroundColor: "#0f4667", textAlign: "center" }}
            >
              <Link
                onClick={() => sendRequest(profile._id)}
                to={{
                  pathname: "/chat",
                  state: {
                    chats: getChatName(cookies.userName, profile.person),
                    name: profile.name,
                    url,
                    friend: profile.person,
                    urlFriend: profile.url,
                  },
                }}
              >
                <Button
                  primary
                  style={{
                    color: "#0f4667",
                    textShadow: "none",
                    margin: "0 auto",
                    borderRadius: "320px",
                    backgroundColor: "#FFF",
                  }}
                >
                  Write
                </Button>
              </Link>
            </Modal.Actions>
          </Modal>
        </div>
      ))}
    </CMap>
  );
}

export default Map;
