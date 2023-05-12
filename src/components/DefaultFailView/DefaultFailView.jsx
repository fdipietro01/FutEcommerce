import { useNavigate } from "react-router-dom";
import notFound from "../../assets/images/notFound.jfif";
import styles from "./DefaultFailView.module.scss";
import Loading from "../Loading/loading";
import { useEffect } from "react";

const DefaultFailView = () => {
  const navigate = useNavigate();

  const redirect = () =>
    setTimeout(() => {
      navigate("/");
    }, 2000);

  useEffect(() => {
    redirect();
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.warningBox}>
            <div>
              <p>Sitio no encontrado</p>
              <p>Redirigiendo a la tienda...</p>
              <Loading container={false} />
            </div>
            <img src={notFound} className={styles.imagen} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultFailView;
