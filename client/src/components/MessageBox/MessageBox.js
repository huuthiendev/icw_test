import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import PropTypes from "prop-types";
import "./styles.css";

function MessageBox(props) {
  const [text, setText] = useState("");

  const sendMessage = () => {
    props.sendMessage(text);
    setText("");
  }

  const handleClick = () => {
    if (text) {
      sendMessage();
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <div className="message-box">
      <input
        type="text"
        placeholder="Message here..."
        value={text}
        onKeyPress={handleKeyPress}
        onChange={(e) => setText(e.target.value)}>
      </input>
      <button type="button" className="d-flex align-items-center" onClick={handleClick}>
        <FaArrowUp />
      </button>
    </div>
  );
}

MessageBox.propTypes = {
  sendMessage: PropTypes.func,
}

export default MessageBox;