import React, { useRef, useEffect } from 'react';
import PropTypes from "prop-types";
import "./styles.css"
import ChatBubble from "../../../../components/ChatBubble/ChatBubble";

const MessageList = React.memo(({ messages, userInfo }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-list-container">
      {messages.map((mess, index) => {
        return <ChatBubble key={index} {...mess} isForeigner={mess.username !== userInfo.username} />;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
})

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object)
}

MessageList.defaultProps = {
  messages: []
};

export default MessageList;