import styles from "./itemlist.module.scss";
import Item from "../Item/Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import bk from "../../assets/images/sad.jpg";
import { Link } from "react-router-dom";

export const ItemList = ({ items, setPage, setNewParams }) => {
  const { hasPrevPage, hasNextPage, docs, page, totalPages, limit } = items;
  if (docs.length === 0)
    return (
      <div className={styles.container}>
        <div className={styles.noProd}>
          <h3>No hay productos disponibles</h3>
          <p>
            <img className={styles.img} src={bk} />
          </p>
        </div>
        <p>
          <Link to={"/"}>
            <button className="btn btn-primary">Ir al inicio</button>
          </Link>
        </p>
      </div>
    );
  return (
    <>
      <p className={styles.tittleContainer}>
        <span className={styles.title}>Mercado de Pases</span>
      </p>
      <div className={styles.container}>
        <div className={styles.productBar}>
          <div className={styles.inputBox}>
            <span>Resultados</span>
            <input
              type="number"
              name="limit"
              value={limit}
              onChange={({ target }) => {
                setNewParams(target.name, target.value);
              }}
            />
          </div>
          <div onClick={() => setNewParams("sort", 1)} className={styles.price}>
            <span>Orden de precio </span>{" "}
            <FontAwesomeIcon icon={faCircleArrowUp} />{" "}
          </div>
          <div
            onClick={() => setNewParams("sort", -1)}
            className={styles.price}
          >
            <span>Orden de precio </span>
            <FontAwesomeIcon icon={faCircleArrowDown} />{" "}
          </div>
        </div>
        <div className={styles.cardsContainer}>
          {docs.map((item) => (
            <Item key={item.id} producto={item} />
          ))}
        </div>
        <div className={styles.paginate}>
          <p>
            <button
              onClick={() => setPage("prev")}
              disabled={!hasPrevPage}
              className={styles.btn}
            >
              {" "}
              Anterior{" "}
            </button>
          </p>

          <p className={styles.btn}>
            Página {page} de {totalPages}{" "}
          </p>

          <p>
            <button
              onClick={() => setPage("next")}
              disabled={!hasNextPage}
              className={styles.btn}
            >
              {" "}
              Siguiente{" "}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
