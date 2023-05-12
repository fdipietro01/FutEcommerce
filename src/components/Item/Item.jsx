import styles from "./item.module.scss";
import { Link } from "react-router-dom";
const Item = ({ producto }) => {
  return (
    <>
      <div className={styles.card}>
        <img className={styles.img} src={producto.thumbnail} alt="" />

        <div className={styles.container}>
          <p>
            <strong>Nombre: </strong>
            {producto.title}
          </p>
          <p>
            <strong>Categoría: </strong> {producto.category}
          </p>
          <p>
            <strong>Precio: </strong> ${producto.price}
          </p>
          <Link to={`/item/${producto.id}`}>
            <button className="btn btn-primary">Ver detalle</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Item;
