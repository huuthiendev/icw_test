import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./styles.css";
import Constants from "../../utils/Constants";
import queryString from 'query-string';

const Home = ({ location }) => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const [isDirectRoomId, setIsDirectRoomId] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const handleJoinRoom = (event) => {
    event.preventDefault();
    setIsValidated(true);
    if (event.currentTarget.checkValidity() === false) {
      return;
    }
    else checkUser();
  }

  useEffect(() => {
    let query = queryString.parse(history.location.search);
    if (query.roomId) {
      setRoomId(query.roomId);
      setIsDirectRoomId(true);
    }
  }, [location]);

  const checkUser = () => {
    setLoading(true);
    var userInfo = { username: username.trim(), roomId: roomId.trim() };
    fetch(Constants.API_ENDPOINT + Constants.API_CHECK_USER_IN_ROOM, {
      method: 'POST',
      body: JSON.stringify(userInfo)
    }).then(data => data.json())
      .then(data => {
        setLoading(false);
        if (data.errorCode) alert(data.message);
        else history.push({ pathname: "/chat-room", userInfo });
      });
  }
  return (
    <Container className="mt-4">
      <Row sm={1} md={2} lg={3} className="justify-content-center">
        <Col>
          <div className="text-center mb-4">
            <h2>Join Chatroom</h2>
          </div>
          <Form noValidate validated={isValidated} onSubmit={(e) => handleJoinRoom(e)}>
            <Form.Group className="mb-3 mt-2">
              <Form.Control type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
              <Form.Control.Feedback type="invalid">
                Please enter your username
              </Form.Control.Feedback>
            </Form.Group>
            {!isDirectRoomId && <Form.Group className="mb-3 mt-2">
              <Form.Control type="text"
                placeholder="Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required />
              <Form.Control.Feedback type="invalid">
                Please enter your room id
              </Form.Control.Feedback>
            </Form.Group>
            }
            <div className="d-grid gap-2 mt-5">
              <Button className="btn-join" variant="success" type="submit">
                {isLoading ? <Spinner animation="border" size="sm" className="mx-2"></Spinner> : 'JOIN'}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;