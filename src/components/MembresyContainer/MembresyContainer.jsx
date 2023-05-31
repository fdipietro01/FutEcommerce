import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Loading from "../Loading/loading";
import { setMembresyRole } from "../../services/userServices";
import { LoginContext } from "../../context/loginContext";
import { SwalFn } from "../../utils/swal";
import Cookies from "js-cookie";

const MembrecyContainer = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, login } = useContext(LoginContext);

  const toogleMembresy = async () => {
    const { user: newUser, status, newToken } = await setMembresyRole(user._id);

    if (status !== 200)
      SwalFn(
        "Error en cambiar estado de membresía",
        message,
        "error",
        "Aceptar"
      );
    else {
      Cookies.remove("JWT");
      login(newToken);
      const legend =
        newUser.role === "User"
          ? "Has dejado de ser miembro Premium"
          : "Bienvenido al mundo Premium";

      SwalFn(
        "Cambio de membresía exitoso",
        <i>
          <p>{legend}</p>
        </i>,
        "success",
        "Aceptar",
        undefined,
        () => navigate("/login")
      );
    }
  };
  useEffect(() => {
    toogleMembresy();
  }, []);
  return loading && <Loading />;
};

export default MembrecyContainer;
