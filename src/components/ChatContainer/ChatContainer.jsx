import { useState, useEffect, useContext } from "react";
import socket from "../../utils/socketClient/socketIoClient";
import Chat from "../Chat/Chat";
import { LoginContext } from "../../context/loginContext";
import { connectChat } from "../../services/chatServices";
import { SwalFn } from "../../utils/swal";
import { useNavigate } from "react-router-dom";

const ChatContainer = () => {
  const [connected, setConnected] = useState(false);
  const { user } = useContext(LoginContext);
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();

  const userName = user && `${user.nombre} ${user.apellido}`;
  const socketConnect = async () => {
    const { status } = await connectChat();
    if (status === 200) {
      setConnected(true);
      socket.connect();
    }
  };
  useEffect(() => {
    if (!user)
      SwalFn(
        "Error al iniciar Chat",
        "Solo disponible para usuario logueados",
        "error",
        "Aceptar",
        undefined,
        () => navigate("/login")
      );

    if (connected) {
      socket.on("confirmConnection", () =>
        socket.emit("usrLogueado", userName)
      );
      socket.on("chat", (data) => {
        setChat(data);
      });
    } else {
      socketConnect();
    }
  }, [connected, user]);

  useEffect(() => {
    return () => {
      socket.emit("desconexión");
    };
  }, []);

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
