import { useState } from "react";
import { reloginPetittion } from "../../services/accountServices";
import ReloginPetition from "../ReloginPetittion/ReloginPetittion";
import { SwalFn } from "../../utils/swal.jsx";
import { useNavigate } from "react-router-dom";

const ReloginContainer = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { message, status } = await reloginPetittion(email);
    if (status !== 200) SwalFn("Error en relogin", message, "error", "Aceptar");
    else
      SwalFn(
        "Solicitud de reseteo exitosa",
        <i>
          <p>{message}</p>
          <p>Ahora, inicia sesión</p>
        </i>,
        "success",
        "Aceptar",
        undefined,
        () => navigate("/login")
      );
  };

  const handleChange = ({ target }) => {
    setEmail(target.value);
  };

  return (
    <ReloginPetition handleSubmit={handleSubmit} handleChange={handleChange} />
  );
};

export default ReloginContainer;
