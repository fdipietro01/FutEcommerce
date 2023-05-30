import styles from "./relogin.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { relogin } from "../../services/accountServices";
import { SwalFn } from "../../utils/swal.jsx";

const Relogin = () => {
  const [user, setUser] = useState({
    mail: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { message, status } = await relogin(user);
    if (status !== 200)
      SwalFn("Error en al actualizar contraseña", message, "error", "Aceptar");
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
    const newUser = { ...user };
    newUser[target.name] = target.value;
    setUser(newUser);
  };
  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={styles.group}>
          <label className={styles.label}>Reingresa tu usuario</label>
          <input
            onChange={(e) => handleChange(e)}
            className={styles.input}
            name="mail"
          />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Nueva contraseña</label>
          <input
            onChange={(e) => handleChange(e)}
            className={styles.input}
            name="password"
          />
        </div>
        <div className={styles.btns}>
          <button className={"btn btn-primary"} type="submit">
            Generar contraseña
          </button>
        </div>
      </form>
    </div>
  );
};
export default Relogin;
