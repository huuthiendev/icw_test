import PropTypes from "prop-types";
import './styles.css';
import { FaShareSquare } from "react-icons/fa";
import Swal from "sweetalert2";

function ChatHeader(props) {
  const handleShareLink = () => {
    Swal.fire({
      text: "Copied room link to clipboard!",
      icon: "success",
      confirmButtonColor: "#5DB075",
      timer: 1000
    });
    navigator.clipboard.writeText(window.location.host + '/?roomId=' + props.roomId);
  }

  return (
    <div className="d-flex align-items-center justify-content-between">
      <button type="submit" className="text-center default-text-color btn" onClick={props.exitRoom}>Exit</button>
      <div><h3>{props.roomId}</h3></div>
      <button type="button" className="text-center default-text-color btn share-button" onClick={() => handleShareLink()}>
        <FaShareSquare size={'18'} />
      </button>
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