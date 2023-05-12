import styles from "./cart.module.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import lupa from "../../assets/images/lupa.jfif";

const Cart = () => {
  const { estaVacio, carrito, eliminarProducto, calcularTotal, vaciarCarrito } =
    useContext(CartContext);
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.card}>
            {estaVacio() ? (
              <>
                <div className={styles.warningBox}>
                  <div>
                    <p>Parece que no hay productos en tu carrito.</p>
                    <p>
                      Mirá nuestra catálogo para empezar a agregar productos.
                    </p>
                    <Link to={"/"}>
                      <button className={"btn btn-primary"}>
                        Visitar Tienda
                      </button>
                    </Link>
                  </div>
                  <img src={lupa} />
                </div>
              </>
            ) : (
              <div className={styles.table}>
                <h5 className={styles.title}>Resumen de compra</h5>
                <div className={styles.row}>
                  <strong>#</strong>
                  <strong>Nombre</strong>
                  <strong>Precio</strong>
                  <strong>Cantidad</strong>
                  <strong>Subtotal</strong>
                  <strong>Quitar</strong>
                </div>
                {carrito.map(({ item, quantity }, idx) => (
                  <div className={styles.row} key={idx}>
                    <p className={styles.productField}>
                      <img
                        className={styles.thumbnail}
                        src={item.thumbnail}
                        alt="imagen-producto"
                      />
                    </p>
                    <p className={styles.productField}>{item.title}</p>
                    <p className={styles.productField}>${item.price}</p>
                    <p className={styles.productField}>{quantity}</p>
                    <p className={styles.productField}>
                      ${quantity * item.price}
                    </p>
                    <p
                      className={styles.productField}
                      onClick={() => eliminarProducto(item._id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className={styles.icon}
                      />
                    </p>
                  </div>
                ))}
                <div className={styles.total}>
                  <div>
                    <p>Valor Total: ${calcularTotal()} </p>
                    <button
                      onClick={vaciarCarrito}
                      className={"btn btn-primary"}
                    >
                      Vaciar Carrito <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </div>
                <p className={styles.btn}>
                  <Link to={"/"}>
                    <button className={"btn btn-primary"}>
                      Ver más productos
                    </button>
                  </Link>
                  <Link to={"/checkout"}>
                    <button className={"btn btn-primary"}>
                      Confirmar compra
                    </button>
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
