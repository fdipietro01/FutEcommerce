import styles from "./login.module.scss";
const Login = ({ handleInput, handleSubmit, handleForgetPassword }) => {
  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.group}>
          <label className={styles.label}>Usuario</label>
          <input
            onChange={(e) => handleInput(e)}
            className={styles.input}
            name="email"
          />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Contraseña</label>
          <input
            onChange={(e) => handleInput(e)}
            className={styles.input}
            name="password"
          />
        </div>
        <div className={styles.btns}>
          <button className={"btn btn-primary"} type="submit">
            Login
          </button>
          <button className={"btn btn-primary"} onClick={handleForgetPassword}>
            Olvidé la contraseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
