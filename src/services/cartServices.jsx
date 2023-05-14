import axios from "axios";
import Cookies from "js-cookie";

export const createCart = async () => {
  const jwt = Cookies.get("JWT");
  try {
    const response = await axios.post(
      `http://localhost:8081/api/carts`,
      {},
      {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      }
    );
    return { id: response.data.id, status: response.status };
  } catch (err) {
    return { status: err.response.status };
  }
};

export const updateCart = async (cid, pid, quantity) => {
  const jwt = Cookies.get("JWT");
  try {
    const response = await axios.post(
      `http://localhost:8081/api/carts/update`,
      { cid, pid, quantity },
      {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      }
    );
    return { status: response.status };
  } catch (err) {
    console.log(err);
    return { status: err.response.status };
  }
};

export const getProductsFromCart = async (cid) => {
  const jwt = Cookies.get("JWT");
  try {
    const response = await axios.get(`http://localhost:8081/api/carts/${cid}`, {
      headers: { Authorization: `Bearer ${jwt}` },
      withCredentials: true,
    });
    return { status: response.status, products: response.data.cartProducts };
  } catch (err) {
    console.log(err);
    return { status: err.response.status };
  }
};
export const deleteCart = async (cid) => {
  const jwt = Cookies.get("JWT");
  try {
    const response = await axios.delete(
      `http://localhost:8081/api/carts/${cid}`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      }
    );
    return { status: response.status, products: response.data.cartProducts };
  } catch (err) {
    console.log(err);
    return { status: err.response.status };
  }
};

export const deleteSingleProduct = async (cid, pid) => {
  const jwt = Cookies.get("JWT");
  try {
    const response = await axios.delete(
      `http://localhost:8081/api/carts/${cid}/${pid}`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      }
    );
    return { status: response.status };
  } catch (err) {
    console.log(err);
    return { status: err.response.status };
  }
};

export const purchaseCart = async (cid, email) => {
  const jwt = Cookies.get("JWT");
  try {
    const response = await axios.post(
      `http://localhost:8081/api/carts/${cid}/purchase`,
      { email },
      {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      }
    );
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (err) {
    console.log(err);
  }
};
