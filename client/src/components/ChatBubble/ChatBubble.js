import PropTypes from "prop-types";
import "./styles.css";
import moment from 'moment';

function ChatBubble({ text, username, isForeigner, created_at }) {
  return (
    isForeigner
      ? <div>
        <div className="ms-2 mb-1 d-flex">{username}<div className="message-time">{moment(created_at).format('HH:mm')}</div></div>
        <div className="bubble-container">
          <div className="bubble bubble-left">
            <div className="message-text">
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>

      : <div className="bubble-container bubble-container-right">
        <div className="bubble bubble-right">
          <div className="message-text">
            <p>{text}</p>
          </div>
        </div>
      </div>
  );
}

ChatBubble.propTypes = {
  text: PropTypes.string.isRequired,
  isForeigner: PropTypes.bool.isRequired
}

ChatBubble.defaultProps = {
  text: "",
  isForeigner: false
};

export default ChatBubble;