import PropTypes from "prop-types";
import './styles.css';

function ChatHeader(props) {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <button type="submit" className="text-center default-text-color btn" onClick={props.exitRoom}>Exit</button>
      <div><h3>{props.roomId}</h3></div>
      <div className="hidden-element"></div>
    </div>
  );
}

ChatHeader.propTypes = {
  roomId: PropTypes.string,
  exitRoom: PropTypes.func,
}

ChatHeader.defaultProps = {
  roomId: 'ROOM ID'
};

export default ChatHeader;