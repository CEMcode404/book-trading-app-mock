import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useContext,
  useRef,
} from "react";
import { UserContext } from "../context/userContext.js";

const ChatBox = forwardRef(function ChatBox({ showHeaderOnClose }, ref) {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [isScrollBttm, triggerScrollBttm] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatDisplayRef = useRef();

  useEffect(() => {
    if (chatDisplayRef.current.scrollHeight && isScrollBttm) {
      chatDisplayRef.current.scrollTo({
        top: chatDisplayRef.current.scrollHeight,
        behavior: "smooth",
      });
      triggerScrollBttm(false);
    }
  }, [isScrollBttm]);

  useEffect(() => {
    setMessages([
      { user: "John", message: "yeah" },
      { user: "Carlo", message: "this" },
      { user: "John", message: "is" },
      { user: "John", message: "test" },
      { user: "Carlo", message: "this is really just a test!" },
      {
        user: "Carlo",
        message:
          "this is really just a test!This is a test this is a test this is a test this is a test this is a test",
      },
      {
        user: "Carlo",
        message:
          "this is really just a test!This is a test this is a test this is a test this is a test this is a test",
      },
    ]);
  }, []);

  const onOpenChat = () => {
    if (isChatOpen) return;
    setIsChatOpen(true);
    triggerScrollBttm(true);
  };

  const onCloseChat = () => {
    setIsChatOpen(false);
  };

  const sendMessage = (e) => {
    if (e.key === "Enter" && chatMessage) {
      setMessages([...messages, { user: "Carlo", message: chatMessage }]);
      triggerScrollBttm(true);
      setChatMessage("");
    }
  };

  const handleOnChangeChatInput = (e) => {
    setChatMessage(e.target.value);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        openChat: onOpenChat,
      };
    },
    []
  );

  const isShowHeader = !(!isChatOpen && !showHeaderOnClose);
  return (
    <div
      className="chat-box"
      style={!isChatOpen && !showHeaderOnClose ? { boxShadow: "none" } : null}
    >
      {isShowHeader && (
        <div className="chat-box__headbar" onClick={onOpenChat}>
          <span
            className="chat-box__x-bttn"
            onClick={onCloseChat}
            style={!isChatOpen ? { visibility: "hidden" } : null}
          >
            +
          </span>
        </div>
      )}
      <div
        className="chat-box__display-input-wrapper"
        style={!isChatOpen ? { height: 0 } : null}
      >
        <div className="chat-box__display" ref={chatDisplayRef}>
          {messages.map((message) => (
            <div
              className={`chat-box__message-wrapper ${
                message.user === user.firstName
                  ? "chat-box__message-wrapper--me"
                  : null
              }`}
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
          type="text"
          className="chat-box__input"
          placeholder="Chat with the owner..."
          onKeyDown={sendMessage}
          onInput={handleOnChangeChatInput}
          value={chatMessage}
        />
      </div>
    </div>
  );
});

export default ChatBox;
