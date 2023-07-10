import axios from "axios";
import Cookies from "js-cookie";

export const connectChat = async () => {
  const jwt = Cookies.get("JWT");
  try {
    const response = await axios.get(`http://localhost:8081/api/chat`, {
      withCredentials: true,
    });
    return { status: response.status };
  } catch (err) {
    return { status: err.response.status };
  }
};
