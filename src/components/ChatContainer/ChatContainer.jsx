import { useState, useEffect, useContext } from "react";
import socket from "../../utils/socketClient/socketIoClient";
import Chat from "../Chat/Chat";
import { LoginContext } from "../../context/loginContext";
import { connectChat } from "../../services/chatServices";
const ChatContainer = () => {
  const [connected, setConnected] = useState(false);
  const { user } = useContext(LoginContext);
  const [chat, setChat] = useState([]);

  const userName = user && `${user.nombre} ${user.apellido}`;
  const socketConnect = async () => {
    const { status } = await connectChat();
    if (status === 200) {
      setConnected(true);
      socket.connect();
    }
  };
  useEffect(() => {
    user && !connected && socketConnect();
    if (connected) {
      console.log("entra");
      socket.on("confirmConnection", () =>
        socket.emit("usrLogueado", userName)
      );
      socket.on("chat", (data) => setChat(data));
    }
  }, [connected, user]);

  console.log(chat, connected);
  const setNewMessage = (message) => {
    socket.emit("nuevoMsj", message);
  };

  return (
    <>
      <Chat messages={chat} userName={userName} setNewMessage={setNewMessage} />
    </>
  );
};

export default ChatContainer;
