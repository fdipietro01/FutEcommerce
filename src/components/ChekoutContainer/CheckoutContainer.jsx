import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { LoginContext } from "../../context/loginContext";
import { purchaseCart } from "../../services/cartServices";
import { SwalFn } from "../../utils/swal";
import Loading from "../Loading/loading.jsx";
import Checkout from "../Checkout/Checkout";

const CheckoutContainer = () => {
  const { estaVacio, order, definirOrden } = useContext(CartContext);
  const { user } = useContext(LoginContext);
  const navigate = useNavigate();

  const submitOrder = async () => {
    if (user) {
      const { status, message, data } = await purchaseCart(
        user.carrito,
        user.email
      );
      console.log(data, "piss");
      if (status === "error")
        SwalFn("Compra no realizada", message, "error", "Aceptar");
      else SwalFn("Compra realizada con éxito", message, "success", "Aceptar");
      definirOrden(data);
    }
  };

  useEffect(() => {
    if (estaVacio() || !user) navigate("/");
  }, [estaVacio]);

  useEffect(() => {
    submitOrder();
  }, []);

  // return ordenId && navigate("/feedback");
  return !order ? <Loading /> : <Checkout order={order} />;
};

export default CheckoutContainer;
