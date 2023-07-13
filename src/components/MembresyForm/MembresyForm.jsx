import { Link } from "react-router-dom";
import styles from "./membresyForm.module.scss";
const MembresyForm = ({ handleInput, handleSubmit, documents }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Solicitar membresía premium</h3>
      <div>
        <p className={styles.p}>
          Para ser miembro premium es necesario cargar la documentación
          requerida
        </p>
        <p className={styles.p}>
          La documentación cargada parcialmente sera guardada, pero la membresía
          se obtiene al completar el proceso
        </p>
      </div>
      ;
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.group}>
          <label className={styles.label}>Identificación</label>
          <label htmlFor="id" className={styles.file}>
            {documents.id.name ?? "Seleccionar"}
          </label>
          <input
            id="id"
            type="file"
            onChange={(e) => handleInput(e)}
            className={styles.hidden}
            name="id"
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Comprobante de Domicilio</label>
          <label htmlFor="comproDom" className={styles.file}>
            {documents.comproDom.name ?? "Seleccionar"}
          </label>
          <input
            id="comproDom"
            type="file"
            onChange={(e) => handleInput(e)}
            className={styles.hidden}
            name="comproDom"
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Comprobante de Cuenta</label>
          <label htmlFor="comproCuen" className={styles.file}>
            {documents.comproCuen.name ?? "Seleccionar"}
          </label>
          <input
            id="comproCuen"
            type="file"
            onChange={(e) => handleInput(e)}
            className={styles.hidden}
            name="comproCuen"
          />
        </div>

        <div className={styles.btns}>
          <button type="submit" className={"btn btn-primary"}>
            Enviar Documentación
          </button>
          <Link to="/">
            <button className={"btn btn-primary"}>Volver al Inicio</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default MembresyForm;
