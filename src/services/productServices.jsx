import axios from "axios";
import Cookies from "js-cookie";

export const getAllProducts = async ({
  limit,
  page = 1,
  sort = 1,
  category,
  status,
}) => {
  let urlBase = `http://localhost:8081/api/products/?limit=${limit}&page=${page}&sort=${sort}`;
  if (category) urlBase += `&category=${category}`;
  if (status) urlBase += `&status=${status}`;
  console.log(urlBase);
  return await axios(urlBase);
};

export const getProductById = async (id) => {
  return await axios(`http://localhost:8081/api/products/${id}`);
};

export const updateItem = async (item) => {
  const jwt = Cookies.get("JWT");
  try {
    const response = await axios.put(
      `http://localhost:8081/api/products/${item._id}`,
      item,
      {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      }
    );
    return { status: response.status };
  } catch (err) {
    return { status: err.response.status };
  }
};

export const eraseItem = async (pid) => {
  const jwt = Cookies.get("JWT");
  try {
    const response = await axios.delete(
      `http://localhost:8081/api/products/${pid}`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      }
    );
    return { status: response.status, id: response.data };
  } catch (err) {
    return { status: err.response.status };
  }
};

export const createItem = async (item) => {
  const jwt = Cookies.get("JWT");
  try {
    const response = await axios.post(
      `http://localhost:8081/api/products/`,
      item,
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
