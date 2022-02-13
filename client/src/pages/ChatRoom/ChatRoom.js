import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";
import Swal from "sweetalert2";

import ChatHeader from "./sections/ChatHeader/ChatHeader";
import MessageList from "./sections/MessageList/MessageList";
import MessageBox from "../../components/MessageBox/MessageBox";
import Constants from "../../utils/Constants";
import "./styles.css";

var io = sailsIOClient(socketIOClient);
io.sails.url = Constants.API_ENDPOINT;

const ChatRoom = ({ location }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isConnected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!location.userInfo) {
      // Navigate back to home page
      history.push("/");
    }
    setUserInfo(location.userInfo);
  }, [location]);

  useEffect(() => {
    if (Object.keys(userInfo).length) {
      // Join a socket room
      io.socket.get(Constants.API_JOIN_ROOM, userInfo, (data, jwr) => {
        if (jwr.statusCode === 200) {
          console.log("Join room success - roomId: ", userInfo.roomId);
          setMessages(data);
          setLoading(false);
          setConnected(true);
        }
        else if (data.errorCode) {
          Swal.fire({
            text: data.message,
            icon: "warning",
            confirmButtonColor: "#5DB075",
          });
          history.push("/");
        }
        else {
          Swal.fire({
            text: "Cannot connect to the server...",
            icon: "warning",
            confirmButtonColor: "#5DB075",
          });
        }
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (isConnected) {
      // Listen message from socket room
      io.socket.on(Constants.EVENT_INCOMING_MESSAGE, (entry) => {
        console.log("Incoming message: ", entry.text);
        let temp = messages;
        temp.push(entry);
        setMessages([...temp]);
      });
    }
  }, [isConnected]);

  const handleExitRoom = () => {
    // Unsubscribe all listeners
    io.socket.removeAllListeners();
    io.socket.post(Constants.API_LEAVE_ROOM, userInfo, (data, res) => {
      console.log("Leave room success...");
    });
    history.push("/");
  }

  const handleSendMessage = (text) => {
    var params = { ...userInfo, text };
    io.socket.post(Constants.API_SEND_MESSAGE, params, (data, res) => {
      console.log("Send message success...");
    });
  }

  return (
    <Container className="mt-4">
      <Row sm={1} md={2} lg={3} className="justify-content-center">
        <Col className="chat-room-container">
          <ChatHeader roomId={userInfo.roomId} exitRoom={handleExitRoom} />
          {isLoading
            ? <div className="chat-loading-container">
              <Spinner animation="border" variant="success"></Spinner>
              <p className="mt-2">Loading data, please wait ...</p>
            </div>
            : <React.Fragment>
              <MessageList messages={messages} userInfo={userInfo} />
              <MessageBox sendMessage={handleSendMessage} />
            </React.Fragment>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default ChatRoom;