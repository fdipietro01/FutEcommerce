import styles from "./checkout.module.scss";

const ListTable = ({ products, approved }) => {
  console.log("Entro al ListTable");
  return (
    <div className={styles.listTable}>
      <h5 className={styles.title}>
        {approved ? "Productos Adquiridos" : "Productos fuera de stock"}
      </h5>
      <div className={styles.titleRow}>
        <strong>#</strong>
        <strong>Nombre</strong>
        <strong>Precio</strong>
        <strong>Cantidad</strong>
        <strong>Subtotal</strong>
      </div>

      {products.map(({ item, quantity }, idx) => (
        <div className={approved ? styles.rowAp : styles.rowRe} key={idx}>
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
          <p className={styles.productField}>${quantity * item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ListTable;
