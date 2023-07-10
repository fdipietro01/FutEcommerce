import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./productManager.module.scss";
import { useState } from "react";

const RowProductTable = ({ item, editItem, deleteItem }) => {
  const [prod, setItem] = useState(item);
  const handleUpdate = () => {
    editItem(prod);
  };
  const handleDelete = () => {
    deleteItem(prod);
  };

  const setStatus = () => {
    const newProd = {
      ...prod,
      status: prod.status === "true" ? "false" : "true",
    };
    setItem({ ...newProd });
  };
  const updateField = ({ name, value }) => {
    const newProd = { ...prod };
    newProd[name] = value;
    setItem({ ...newProd });
  };

  return (
    <>
      <input
        name="title"
        type=""
        value={prod.title}
        onChange={({ target }) => {
          updateField(target);
        }}
      />
      <input
        name="category"
        type=""
        value={prod.category}
        onChange={({ target }) => {
          updateField(target);
        }}
      />
      <input
        name="stock"
        type="number"
        value={prod.stock}
        onChange={({ target }) => {
          updateField(target);
        }}
      />
      <input
        name="price"
        type=""
        value={prod.price}
        onChange={({ target }) => {
          updateField(target);
        }}
      />
      <input
        name="description"
        type=""
        value={prod.description}
        onChange={({ target }) => {
          updateField(target);
        }}
      />
      <input
        name="thumbnail"
        type=""
        value={prod.thumbnail}
        onChange={({ target }) => {
          updateField(target);
        }}
      />
      <p name="status" readOnly type="" value={prod.status}>
        <span>{prod.status}</span>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faArrowRotateLeft}
          onClick={setStatus}
        />
      </p>
      <p name="status" readOnly type="" value={prod.status}>
        <span className={styles.owner}>{prod.owner}</span>
      </p>
      <div>
        <button onClick={handleUpdate}>
          <FontAwesomeIcon className={styles.updateIcon} icon={faPenToSquare} />
        </button>
      </div>
      <div>
        <button onClick={handleDelete}>
          <FontAwesomeIcon className={styles.updateIcon} icon={faTrashCan} />
        </button>
      </div>
    </>
  );
};

export default RowProductTable;
