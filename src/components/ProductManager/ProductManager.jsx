import RowProductTable from "./RowProductTable";
import styles from "./productManager.module.scss";
const ProductManager = ({
  prods,
  editItem,
  deleteItem,
  handleSubmit,
  handleInput,
  newProduct,
}) => {
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.headerBox}>
        <h3 className={styles.title}>Administrar Catálogo</h3>
        <div className={styles.box}>
          <p>
            *Para modificar un producto, editar directamente sobre el campo a
            cambiar <br />y confirmar haciendo click en ícono de editar.
          </p>
          <p>**El registro "creador" no admite ser modificado.</p>
        </div>
      </div>
      {prods.length !== 0 && (
        <table className={styles.table}>
          <tbody>
            <tr className={styles.titulos}>
              <th className={styles.theads}>Nombre</th>
              <th className={styles.theads}>Categoría</th>
              <th className={styles.theads}>Stock</th>
              <th className={styles.theads}>Precio</th>
              <th className={styles.theads}>Descripción</th>
              <th className={styles.theads}>Imagen</th>
              <th className={styles.theads}>Disponible</th>
              <th className={styles.theads}>Creador</th>
              <th className={styles.update}>Edit</th>
              <th className={styles.update}>Supr</th>
            </tr>
            {prods.map((item) => (
              <tr className={styles.row} key={item._id}>
                <RowProductTable
                  item={item}
                  editItem={editItem}
                  deleteItem={deleteItem}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <h3 className={styles.subtitle}>Formulario para agregar productos</h3>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <div className={styles.group}>
            <label className={styles.label}>Nombre</label>
            <input
              onChange={(e) => handleInput(e)}
              className={styles.input}
              name="title"
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Categoría</label>
            <select
              className={styles.select}
              name="category"
              type=""
              onChange={(e) => handleInput(e)}
            >
              <option className={styles.selecTitle} selected disabled>
                Seleccionar
              </option>
              <option value="Arqueros">Arqueros</option>
              <option value="Defensores">Defensores</option>
              <option value="Centrocampistas">Centrocampistas </option>
              <option value="Delanteros">Delanteros</option>
            </select>
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Precio</label>
            <input
              onChange={(e) => handleInput(e)}
              className={styles.input}
              name="price"
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Stock</label>
            <input
              onChange={(e) => handleInput(e)}
              className={styles.input}
              name="stock"
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Descripción</label>
            <input
              onChange={(e) => handleInput(e)}
              className={styles.input}
              name="description"
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Código</label>
            <input
              onChange={(e) => handleInput(e)}
              className={styles.input}
              name="code"
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Imagen</label>
            <label htmlFor="imageProd" className={styles.file}>
              {newProduct.thumbnail?.name ?? "Seleccionar"}
            </label>
            <input
              id="imageProd"
              type="file"
              onChange={(e) => handleInput(e)}
              className={styles.hidden}
              name="thumbnail"
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Status</label>
            <select
              className={styles.select}
              name="status"
              onChange={(e) => handleInput(e)}
            >
              <option className={styles.selecTitle} selected disabled>
                Seleccionar
              </option>
              <option value="true">Disponible</option>
              <option value="false">No Disponible</option>
            </select>
          </div>
          <button className="btn btn-primary">Crear Producto</button>
        </form>
      </div>
    </div>
  );
};

export default ProductManager;
