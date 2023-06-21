import { useState, useEffect, useContext } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import Loading from "../Loading/loading.jsx";
import { getProductById } from "../../services/productServices";
import { errorNavigateRedirect } from "../../hooks/serviceErrorRedirect";
import { LoginContext } from "../../context/loginContext";
import { SwalFn } from "../../utils/swal.jsx";
import { useNavigate } from "react-router-dom";

const ItemDetailContainer = () => {
  const { dataErrorRedirect } = errorNavigateRedirect();
  const [item, modificarItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useContext(LoginContext);
  const navigate = useNavigate();

  const checkSession = () => {
    if (!user)
      SwalFn(
        "Usuario no registrado",
        "Para agregar productos al carrito debe registrarse o iniciar sesión",
        "error",
        "Login",
        "Registrarse",
        () => navigate("/login"),
        () => navigate("/register")
      );
  };

  const getProd = async () => {
    const { data, status } = await getProductById(id);
    if (status !== 200) {
      dataErrorRedirect();
    }
    modificarItem(data.payload);
    setLoading(false);
  };
  useEffect(() => {
    getProd();
  }, [id]);

  useEffect(() => {
    const checkSession = () => {};
  }, [user]);

  return loading ? (
    <Loading container={true} />
  ) : (
    <ItemDetail itemDetalle={item} checkSession={checkSession} user={user} />
  );
};

export default ItemDetailContainer;
