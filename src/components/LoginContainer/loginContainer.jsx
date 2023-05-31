import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { getLogin } from "../../services/accountServices";
import { SwalFn } from "../../utils/swal.jsx";

const LoginContainer = () => {
  const { user: userCtx, login } = useContext(LoginContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleInput = ({ target }) => {
    user[target.name] = target.value;
    setUser({ ...user });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { message, data, token } = await getLogin(user);
    if (!data) {
      SwalFn("Error en Login", message, "error", "Aceptar");
    } else {
      login(token);
      navigate("/");
    }
  };

  const handleForgetPassword = () => {
    navigate("/reloginPetittion");
  };
  useEffect(() => {
    userCtx && navigate("/");
  }, [userCtx]);

  return (
    <>
      <Login
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        handleForgetPassword={handleForgetPassword}
      />
    </>
  );
};

export default LoginContainer;
