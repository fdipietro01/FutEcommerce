import { useState, useContext, useEffect } from "react";
import { createContext } from "react";
import { LoginContext } from "./loginContext";
import {
  createCart,
  updateCart,
  deleteSingleProduct,
  deleteCart,
  getProductsFromCart,
} from "../services/cartServices";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [order, setOrder] = useState();
  const { user, updateCartUser } = useContext(LoginContext);

  const createCartAndSetToUser = async () => {
    const { id: cartId } = await createCart();
    if (cartId) {
      await updateCartUser(user._id, cartId);
    }
  };
  const requestProducts = async (cid) => {
    const { products } = await getProductsFromCart(cid);
    setCarrito(products);
  };
  useEffect(() => {
    if (user) {
      if (!user.carrito) createCartAndSetToUser();
      else {
        requestProducts(user.carrito);
      }
    } else setCarrito([]);
  }, [user]);

  useEffect(() => {
    order && setCarrito(order.remainingProducts ?? []), [order];
  });

  const agregarProducto = async (nuevoItem, cantidad) => {
    const { status } = await updateCart(user.carrito, nuevoItem._id, cantidad);
    await requestProducts(user.carrito);
  };
  const existeProducto = (id) =>
    carrito.some(({ item }) => {
      return item._id === id;
    });

  const eliminarProducto = async (id) => {
    await deleteSingleProduct(user.carrito, id);
    setCarrito(carrito.filter(({ item }) => item._id !== id));
  };

  const vaciarCarrito = async () => {
    await deleteCart(user.carrito);
    setCarrito([]);
  };

  const calcularTotal = () =>
    carrito.reduce((acu, cur) => acu + cur.item.price * cur.quantity, 0);

  const contarProductos = () =>
    carrito.reduce((acu, cur) => acu + cur.quantity, 0);

  const estaVacio = () => carrito.length === 0;

  const definirOrden = (orden) => setOrder(orden);

  const reiniciarContexto = () => {
    setOrder();
    setCarrito([]);
  };

  return (
    <CartContext.Provider
      value={{
        agregarProducto,
        existeProducto,
        eliminarProducto,
        vaciarCarrito,
        calcularTotal,
        contarProductos,
        definirOrden,
        reiniciarContexto,
        estaVacio,
        carrito,
        order,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
