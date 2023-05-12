import axios from "axios";
import Cookies from "js-cookie";

export const updateUser = async (id, cid) => {
  const jwt = Cookies.get("JWT");
  try {
    const response = await axios.put(
      `http://localhost:8081/api/users/${id}/${cid}`,
      {},
      {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      }
    );
    return { user: response.data.user, status: response.status };
  } catch (err) {
    console.log(err, "err");
    return { status: err.response.status };
  }
};
