import styles from "./checkout.module.scss";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const Checkout = () => {
  const { estaVacio, calcularTotal, carrito, definirOrden } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = ({ target }) => {
    form[target.name] = target.value;
    setForm({ ...form });
  };

  useEffect(() => {
    if (estaVacio()) navigate("/");
  }, [estaVacio]);

  const fullForm = form?.nombre && form.apellido && form.telefono && form.email;

  const submitOrder = async () => {
    const order = { buyer: form, items: carrito, total: calcularTotal() };
    const db = getFirestore();
    const collecion = collection(db, "ordenes");
    const { id: ordenId } = await addDoc(collecion, order);
    definirOrden(ordenId);
    return ordenId && navigate("/feedback");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h5 className={styles.title}>
            Completá tus datos para finalizar tu compra
          </h5>
          <div>
            <form>
              <div className={styles.fieldBox}>
                <label className={styles.label}>Nombre</label>
                <input onChange={(e) => handleChange(e)} name="nombre" />
              </div>
              <div className={styles.fieldBox}>
                <label className={styles.label}>Apellido</label>
                <input onChange={(e) => handleChange(e)} name="apellido" />
              </div>
              <div className={styles.fieldBox}>
                <label className={styles.label}>Email</label>
                <input onChange={(e) => handleChange(e)} name="email" />
              </div>
              <div className={styles.fieldBox}>
                <label className={styles.label}>Teléfono</label>
                <input onChange={(e) => handleChange(e)} name="telefono" />
              </div>
            </form>
          </div>
          <p className={styles.btn}>
            <button
              onClick={submitOrder}
              disabled={!fullForm}
              className={"btn btn-primary"}
            >
              Confirmar Compra
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Checkout;
