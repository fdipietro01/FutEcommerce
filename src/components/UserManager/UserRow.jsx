import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./userManager.module.scss";
import { SwalFn } from "../../utils/swal";

const UserRow = ({ deleteUsr, usr, setRole }) => {
  const changeRole = () => {
    SwalFn(
      `Cambiar rol de usuario`,
      <i>
        <p>
          ¿Esta seguro de querer modificar el rol del usuario de {usr.email}?
        </p>
      </i>,
      "warning",
      "Aceptar",
      "Cancelar",
      () => setRole(usr._id),
      () => {}
    );
  };
  const erase = () => {
    SwalFn(
      `Eliminar usuario`,
      <i>
        <p>¿Esta seguro de querer eliminar al usuario de {usr.email}?</p>
      </i>,
      "warning",
      "Aceptar",
      "Cancelar",
      () => deleteUsr(usr._id),
      () => {}
    );
  };

  return (
    <>
      <p className={styles.fieldValue}> {usr.nombre}</p>
      <p className={styles.fieldValue}> {usr.apellido}</p>
      <p className={styles.fieldValue}> {usr.email}</p>
      <p className={styles.fieldValue}>{usr.role}</p>
      <p className={styles.updateValue}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faTrashCan}
          onClick={erase}
        />
      </p>
      <p className={styles.updateValue}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faPen}
          onClick={changeRole}
        />
      </p>
    </>
  );
};

export default UserRow;
