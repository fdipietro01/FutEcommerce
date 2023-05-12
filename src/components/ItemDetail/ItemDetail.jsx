import styles from "./itemDetail.module.scss";
import ItemCount from "../ItemCount/ItemCount";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";

const ItemDetail = ({ itemDetalle, checkSession, user }) => {
  const [productoAgregado, setProductoAgregado] = useState(false);

  const { agregarProducto } = useContext(CartContext);
  const onAdd = (cant) => {
    if (user) {
      agregarProducto(itemDetalle, cant);
      setProductoAgregado(true);
    }
    checkSession();
  };
  const isAdmin = user?.role === "Admin";

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h4 className={styles.tittle}> {itemDetalle.title}</h4>
          <div className={styles.cardBody}>
            <img src={itemDetalle.thumbnail} className={styles.imagen} />
            <div className={styles.contentBox}>
              <p>
                <strong>Descripción:</strong> {itemDetalle.description}
              </p>
              <p>
                <strong>Categoría:</strong> {itemDetalle.category}
              </p>
              <p>
                <strong>Precio </strong>${itemDetalle.price}
              </p>
              <p>
                <strong>Codigo </strong>
                {itemDetalle.code}
              </p>
              <p>
                <strong>Stock </strong>
                {itemDetalle.stock}
              </p>
            </div>
          </div>
          {!isAdmin ? (
            productoAgregado ? (
              <div className={styles.btn}>
                <Link to={"/cart"}>
                  <button className="btn btn-primary">Ir al Carrito</button>
                </Link>
                <Link to={"/"}>
                  <button className="btn btn-primary">Ver más productos</button>
                </Link>{" "}
              </div>
            ) : (
              <ItemCount stock={itemDetalle.stock} inicial={1} onAdd={onAdd} />
            )
          ) : (
            <Link to={"/"} className={styles.btn}>
              <button className="btn btn-primary">Volver al Inicio</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
