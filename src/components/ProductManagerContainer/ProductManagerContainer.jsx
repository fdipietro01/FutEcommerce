import Loading from "../Loading/loading";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductManager from "../ProductManager/ProductManager";
import { LoginContext } from "../../context/loginContext";
import {
  getAllProducts,
  updateItem,
  eraseItem,
  createItem,
} from "../../services/productServices";
import { SwalFn } from "../../utils/swal";

const ProductManagerContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({});
  const [toogleRefresh, setToogleRefresh] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(LoginContext);

  const getProducts = async () => {
    const { data, status } = await getAllProducts({
      limit: 10,
    });
    if (status !== 200) {
      dataErrorRedirect();
    }
    setProductos(data.docs);
    setLoading(false);
  };

  const editItem = async (item) => {
    const { status, message } = await updateItem(item);
    if (status === 200) {
      SwalFn(
        "Actualización exitosa",
        "El producto ha sido modificado",
        "success",
        "Aceptar"
      );
    } else {
      SwalFn(
        "El producto no ha sido modificado",
        message,
        "error",
        "Aceptar",
        undefined,
        () => setToogleRefresh((prev) => !prev)
      );
    }
  };

  const deleteItem = async (item) => {
    const { status, message } = await eraseItem(item);
    if (status === 200) {
      SwalFn(
        "Borrado exitoso",
        "El producto ha sido eliminado",
        "success",
        "Aceptar",
        undefined,
        () => setToogleRefresh((prev) => !prev)
      );
    } else {
      SwalFn("Error al borrar", message, "error", "Aceptar");
    }
  };

  const handleInput = ({ target }) => {
    const np = { ...newProduct };
    np[target.name] = target.value;
    setNewProduct(np);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status } = await createItem({ ...newProduct, owner: user.email });
    if (status === 200) {
      e.target.reset();
      SwalFn(
        "Producto creado exitosamente",
        "El producto ha sido craado",
        "success",
        "Aceptar",
        undefined,
        () => setToogleRefresh((prev) => !prev)
      );
    } else {
      SwalFn(
        "Error al crear producto",
        "El producto no ha sido creado",
        "error",
        "Aceptar"
      );
    }
  };
  useEffect(() => {
    getProducts();
  }, [toogleRefresh]);
  return loading ? (
    <Loading />
  ) : (
    <ProductManager
      prods={productos}
      editItem={editItem}
      deleteItem={deleteItem}
      handleSubmit={handleSubmit}
      handleInput={handleInput}
    />
  );
};

export default ProductManagerContainer;
