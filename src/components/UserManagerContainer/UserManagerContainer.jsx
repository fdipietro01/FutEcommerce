import { useEffect, useState } from "react";
import UserManager from "../UserManager/UserManager";
import styles from "../UserManager/userManager.module.scss";

import {
  getAllUsers,
  deleteUser,
  setMembresyRole,
  deleteAllUsers,
} from "../../services/userServices";
import { SwalFn } from "../../utils/swal";

const UserMaganerContainer = () => {
  const [users, setUsers] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const getUsers = async () => {
    const { users } = await getAllUsers();
    setUsers(users);
  };

  const deleteUsrAndUpdate = async (uid) => {
    await deleteUser(uid);
    setShouldUpdate((prev) => !prev);
  };

  const deleteAllUsrs = async () => {
    const erase = async () => {
      const { deleted, status } = await deleteAllUsers();
      if (status === 200) {
        if (deleted.length > 0) {
          SwalFn(
            `Eliminar usuarios`,
            <i>
              <p>Usuarios inactivos eliminados exitosamente</p>
              {deleted.map((x, idx) => (
                <ul className={styles.mailItem} key={idx}>
                  <li>{x}</li>
                </ul>
              ))}
            </i>,
            "success",
            "Aceptar",
            "Cancelar"
          );
        } else {
          SwalFn(
            `Eliminar usuarios`,
            <i>
              <p>No existen usuarios inactivos al momento</p>
            </i>,
            "info",
            "Aceptar",
            "Cancelar"
          );
        }
      }
      setShouldUpdate((prev) => !prev);
    };

    SwalFn(
      `Cambiar rol de usuario`,
      <i>
        <p>
          ¿Esta seguro de eliminar los usuarios inactivos los últimos 2 días?
        </p>
      </i>,
      "warning",
      "Aceptar",
      "Cancelar",
      async () => {
        await erase();
      },
      () => {}
    );
  };

  const setRole = async (uid) => {
    const { status } = await setMembresyRole(uid);

    if (status !== 200)
      SwalFn(
        "Error de Memebresía",
        <p>Algo inesperado ocurrió al intentar modificar su membresía</p>,
        "error",
        "Aceptar"
      );
    else {
      SwalFn(
        "Cambio de membresía exitoso",
        <i>
          <p>El cambio de rol se ha realizado</p>
        </i>,
        "success",
        "Aceptar",
        undefined,
        () => setShouldUpdate((prev) => !prev)
      );
    }
  };

  useEffect(() => {
    getUsers();
  }, [shouldUpdate]);

  return (
    <UserManager
      users={users}
      deleteUsr={deleteUsrAndUpdate}
      setRole={setRole}
      deleteAllUsrs={deleteAllUsrs}
    />
  );
};

export default UserMaganerContainer;
