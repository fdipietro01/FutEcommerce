import styles from "./relogin.module.scss";
const ReloginPetittion = ({ handleChange, handleSubmit }) => {
  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={styles.group}>
          <label className={styles.label}>Usuario</label>
          <input
            onChange={(e) => handleChange(e)}
            className={styles.input}
            name="email"
          />
        </div>
        <div className={styles.btns}>
          <button className={"btn btn-primary"} type="submit">
            Solicitar reseteo
          </button>
        </div>
      </form>
    </div>
  );
};
export default ReloginPetittion;
