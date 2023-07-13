import styles from "./chat.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const Chat = ({ messages, setNewMessage, userName }) => {
  const [inputState, setInput] = useState("");

  const handleInputChange = ({ value }) => setInput(value);
  const handleSubmit = (e) => {
    if (inputState === "") return;
    e.preventDefault();
    setNewMessage({ user: userName, message: inputState });
    setInput("");
  };

  const getConversations = (messages) => {
    const listItems = messages.map(({ message, user }, index) => {
      let bubbleClass = user === userName ? "mineMessages" : "othersMessage";
      let bubbleDirection = user === userName ? "" : "bubble-direction-reverse";
      return (
        <div
          key={index}
          className={`${styles.bubbleContainer} ${styles[bubbleDirection]}`}
        >
          <label className={styles.label}>{user}</label>
          <div className={`${styles[bubbleClass]} ${styles.bubble}`}>
            {message}
          </div>
        </div>
      );
    });
    return listItems;
  };
  const chat = getConversations(messages);
  return (
    <div className={styles.container}>
      <div className={styles.chats}>
        <div className={styles.tittle}>
          Chat <FontAwesomeIcon className={styles.icon} icon={faMessage} />
        </div>
        <div className={styles.chatList}>{chat}</div>
        <div className={styles.formBox}>
          <form className={styles.newMessage} onSubmit={(e) => handleSubmit(e)}>
            <input
              value={inputState}
              placeholder="Escriba un nuevo mensaje"
              onChange={({ target }) => handleInputChange(target)}
              className={styles.newMessageInput}
            />
            <button type="submit" className={`btn btn-primary ${styles.btns}`}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
