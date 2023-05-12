import axios from "axios";
import Cookies from "js-cookie";

export const getLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(`http://localhost:8081/sessions/login`, {
      email,
      password,
    });

    return {
      message: response.data.message,
      data: response.data.user,
      token: response.data.token,
    };
  } catch (err) {
    return { message: err.response.data.message };
  }
};
export const createUser = async ({
  email,
  password,
  nombre,
  apellido,
  edad,
  avatar,
  fecha,
}) => {
  try {
    const response = await axios.post(
      `http://localhost:8081/sessions/register`,
      {
        email,
        password,
        nombre,
        apellido,
        edad,
        avatar,
        fecha,
      }
    );
    return { message: response.data.message, status: response.status };
  } catch (err) {
    return { message: err.response.data.message };
  }
};

export const getCurrentUser = async () => {
  const jwt = Cookies.get("JWT");
  try {
    const response = await axios(`http://localhost:8081/sessions/current`, {
      headers: { Authorization: `Bearer ${jwt}` },
      withCredentials: true,
    });
    return {
      data: response.data.user,
    };
  } catch (err) {
    return { message: err.response.data.message };
  }
};

export const logOut = async () => {
  const jwt = Cookies.get("JWT");
  if (jwt) {
    try {
      const response = await axios(`http://localhost:8081/sessions/logout`, {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      });
      return response;
    } catch (err) {
      return { message: err.response.data.message };
    }
  }
};
