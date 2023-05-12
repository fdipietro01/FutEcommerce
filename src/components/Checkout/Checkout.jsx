import styles from "./checkout.module.scss";
import { Link } from "react-router-dom";
import ListTable from "./ListTable";

const Checkout = ({ order }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          {order._id ? (
            <div>
              <h4 className={styles.h4}>Su número de orden es: {order._id}</h4>
              <ListTable
                products={order.updatedStockProducts}
                approved={true}
              />
              <ListTable products={order.remainingProducts} approved={false} />
            </div>
          ) : (
            <ListTable products={order.remainingProducts} />
          )}
          <p className={styles.btn}>
            <Link to="/">
              <button className={"btn btn-primary"}>Volver al Inicio</button>
            </Link>
            {!order.updatedStockProducts && (
              <Link to="/cart">
                <button className={"btn btn-primary"}>Volver al Carrito</button>
              </Link>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Checkout;
