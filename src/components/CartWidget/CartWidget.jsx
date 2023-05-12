import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import styles from "./CartWidget.module.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";

export const CartWidget = () => {
  const { contarProductos, estaVacio } = useContext(CartContext);
  return (
    <>
      <div className={styles.container}>
        <FontAwesomeIcon className={styles.icon} icon={faShoppingCart} />
        {!estaVacio() && (
          <div className={styles.number}>{contarProductos()}</div>
        )}
      </div>
    </>
  );
};
