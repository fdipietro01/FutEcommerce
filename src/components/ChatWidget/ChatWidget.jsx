import styles from "./ChatWidget.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

const ChatWidget = () => {
  return (
    <>
      <div className={styles.container}>
        <FontAwesomeIcon className={styles.icon} icon={faMessage} />
      </div>
    </>
  );
};

export default ChatWidget;
