import { useContext } from "react";
import { useEffect } from "react";
import styles from "./feedback.module.scss";
import { CartContext } from "../../context/cartContext";
import { useNavigate, Link } from "react-router-dom";

const Feedback = () => {
  const { orden, estaVacio, reiniciarContexto } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (estaVacio()) navigate("/");
  }, [estaVacio]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h5 className={styles.title}>Compra realizada con éxito</h5>
          <div> Numero de Orden : {orden}</div>
          <p className={styles.btn}>
            <Link to={"/"}>
              <button onClick={reiniciarContexto} className={"btn btn-primary"}>
                Volver al catálogo
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Feedback;
