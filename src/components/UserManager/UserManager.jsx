import UserRow from "./UserRow";
import styles from "./userManager.module.scss";
const UserManager = ({ users, deleteUsr, setRole }) => {
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.headerBox}>
        <h3 className={styles.title}>Administrar Usuarios</h3>
        <div className={styles.box}>
          <p>
            Desde este panel pueden eliminarse usuarios y ser modificadas las
            memebresías.
          </p>
        </div>
      </div>
      {users.length !== 0 ? (
        <table className={styles.table}>
          <tbody>
            <tr className={styles.titulos}>
              <th className={styles.theads}>Nombre</th>
              <th className={styles.theads}>Apellido</th>
              <th className={styles.theads}>Email</th>
              <th className={styles.theads}>Rol</th>
              <th className={styles.update}>Supr</th>
              <th className={styles.update}>Set Rol</th>
            </tr>
            {users.map((usr) => (
              <tr className={styles.row} key={usr._id}>
                <UserRow usr={usr} deleteUsr={deleteUsr} setRole={setRole} />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No existen usarios actualmente</div>
      )}
    </div>
  );
};

export default UserManager;
