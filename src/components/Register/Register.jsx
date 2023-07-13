import styles from "./register.module.scss";
const Register = ({ handleInput, handleSubmit, handleLogin }) => {
  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.group}>
          <label className={styles.label}>Nombre</label>
          <input
            onChange={(e) => handleInput(e)}
            className={styles.input}
            name="nombre"
          />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Apellido</label>
          <input
            onChange={(e) => handleInput(e)}
            className={styles.input}
            name="apellido"
          />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Edad</label>
          <input
            onChange={(e) => handleInput(e)}
            className={styles.input}
            name="edad"
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Email</label>
          <input
            onChange={(e) => handleInput(e)}
            className={styles.input}
            name="email"
          />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Password</label>
          <input
            onChange={(e) => handleInput(e)}
            className={styles.input}
            name="password"
          />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Url de Avatar</label>
          <input
            type="file"
            onChange={(e) => handleInput(e)}
            className={styles.input}
            name="avatar"
          />
        </div>
        <div className={styles.btns}>
          <button className={"btn btn-primary"} type="submit">
            Registrarse
          </button>
          <button className={"btn btn-primary"} onClick={handleLogin}>
            Ir al Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
