import PropTypes from "prop-types";
import React, { useState, useEffect, useContext, useRef } from "react";

import { UserContext } from "../../contexts/userContext.js";

import "./chatBox.scss";

const ChatBox = ({
  isOpen = false,
  onOpen,
  onClose,
  showHeaderOnClose = false,
}) => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const chatBoxRef = useRef();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (isOpen)
      setTimeout(() => {
        chatBoxRef.current?.scrollTo({
          top: chatBoxRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
  }, [isOpen, messages]);

  useEffect(() => {
    setMessages([
      { user: "John", message: "Hi" },
      { user: user.firstName, message: "Hello" },
      { user: "John", message: "Can you lower the price?" },
      { user: "John", message: "Please." },
      { user: user.firstName, message: "Yeah, sure." },
      {
        user: user.firstName,
        message: "As long as it's not too much.",
      },
      {
        user: "John",
        message: "Thank you very much! I really appreaciate it.",
      },
    ]);
  }, []);

  function handleSendMessage(e) {
    const newMessage = chatInput.trim();
    if (e.key === "Enter" && newMessage) {
      setMessages([...messages, { user: user.firstName, message: newMessage }]);
      setChatInput("");
    }
  }

  function closeChatBox(e) {
    e.stopPropagation();
    onClose();
  }

  const isShowHeader = !(!isOpen && !showHeaderOnClose);
  return (
    <div className="chat-box">
      {isShowHeader && (
        <div className="chat-box__headbar" onClick={onOpen}>
          <span className="chat-box__x-bttn" onClick={closeChatBox}>
            +
          </span>
        </div>
      )}

      {isOpen && (
        <div className="chat-box__display-and-input">
          <div className="chat-box__display" ref={chatBoxRef}>
            {messages.map((message, index) => (
              <div
                className={`chat-box__message-wrapper ${
                  message.user === user.firstName
                    ? "chat-box__message-wrapper--me"
                    : null
                }`}
                key={index}
              >
                <p
                  className={
                    message.user === user.firstName
                      ? "chat-box__message chat-box__message--me"
                      : "chat-box__message chat-box__message--other"
                  }
                >
                  {message.message}
                </p>
              </div>
            ))}
          </div>
          <input
            autoComplete="off"
            className="chat-box__input"
            id="chat-box__input"
            onKeyDown={handleSendMessage}
            onInput={(e) => setChatInput(e.target.value)}
            placeholder="Chat with the owner..."
            type="text"
            value={chatInput}
          />
        </div>
      )}
    </div>
  );
};

ChatBox.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  showHeaderOnClose: PropTypes.bool,
};

export default ChatBox;
