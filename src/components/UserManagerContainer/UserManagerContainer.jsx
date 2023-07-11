import { useEffect, useState } from "react";
import UserManager from "../UserManager/UserManager";
import {
  getAllUsers,
  deleteUser,
  setMembresyRole,
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
    />
  );
};

export default UserMaganerContainer;
