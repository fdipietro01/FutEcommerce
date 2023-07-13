import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { setMembresyRole, uploadDocuments } from "../../services/userServices";
import { LoginContext } from "../../context/loginContext";
import { SwalFn } from "../../utils/swal";
import Cookies from "js-cookie";
import MembresyForm from "../MembresyForm/MembresyForm";

const MembresyContainer = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(LoginContext);
  const [documents, setDocuments] = useState({
    id: "",
    comproDom: "",
    comproCuen: "",
  });

  const setMembresy = async () => {
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
        () => navigate("/profile")
      );
    }
  };

  const handleInput = ({ target }) => {
    const newDocs = { ...documents };
    newDocs[target.name] = target.files[0];
    setDocuments(newDocs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(documents).some((doc) => doc !== "")) {
      SwalFn(
        "Error al cargar documentos",
        <i>
          <p>Debe al menos cargarse un documento para ser enviado</p>
        </i>,
        "error",
        "Aceptar",
        undefined
      );
      return;
    }
    const { status, message, isUpgradeable } = await uploadDocuments(
      user._id,
      Object.values(documents)
    );
    if (status === 200) {
      SwalFn(
        "Documentación cargada",
        <i>
          <p>{message}</p>
        </i>,
        "success",
        isUpgradeable ? "Solicitar Premium" : "Aceptar",
        "Cancelar",
        isUpgradeable ? setMembresy : () => {}
      );
    } else {
      SwalFn(
        "Error en la carga",
        <i>
          <p>{message}</p>
        </i>,
        "error",
        "Aceptar",
        undefined
      );
    }
  };

  useEffect(() => {
    user.role === "Premium" && setMembresy();
  }, []);

  return (
    user?.role === "User" && (
      <MembresyForm
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        documents={documents}
      />
    )
  );
};

export default MembresyContainer;
