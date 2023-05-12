import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import { createUser } from "../../services/accountServices";
import { SwalFn } from "../../utils/swal.jsx";

const RegisterContainer = () => {
  const { user: userCtx } = useContext(LoginContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    edad: "",
    avatar: "",
  });

  const handleInput = ({ target }) => {
    const newUser = { ...user };
    newUser[target.name] = target.value;
    setUser(newUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString("esp", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    user.fecha = date;
    const { message, status } = await createUser(user);
    if (status !== 200) {
      SwalFn("Error en Registro", message, "error", "Aceptar");
    } else {
      SwalFn(
        "Registro exitoso",
        <i>
          <p>{message}</p>
          <p>Ahora, inicia sesión</p>
        </i>,
        "success",
        "Aceptar",
        undefined,
        () => navigate("/login")
      );
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };
  useEffect(() => {
    userCtx && navigate();
  }, [userCtx]);

  return (
    <>
      <Register
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        handleLogin={handleLogin}
      />
    </>
  );
};

export default RegisterContainer;
